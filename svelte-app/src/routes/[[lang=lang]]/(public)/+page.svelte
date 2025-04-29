<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { zxcvbn } from '@zxcvbn-ts/core';

  import type { LogInInput } from '@api/User';

  import { AuthorizationCookie } from '@utils/Constants';
  import { ErrorCode } from '@api/Error';
  import { logIn } from '@api/User';
  import { setCookie } from '@utils/Cookies';
  import { t, locale, loadTranslations } from '@utils/Translations';

  let lang = $state($page.params.lang);
  locale.set($page.params.lang);
  $effect(() => {
    lang = $page.params.lang;
    locale.set(lang);
    loadTranslations(lang, 'session');
  });

  async function login(e: Event) {
    e.preventDefault();
    const internalError = document.getElementById('internal-error')!;
    const clientError = document.getElementById('client-error')!;
    internalError.style.display = 'none';
    clientError.style.display = 'none';

    const form = document.getElementById('login-form') as HTMLFormElement;
    const email = document.getElementById('email') as HTMLFormElement;
    const password = document.getElementById('password') as HTMLFormElement;

    password.setCustomValidity('');
    form.reportValidity();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (zxcvbn(password.value).score < 3) {
      password.setCustomValidity($t('session.weak-password'));
      form.reportValidity();
      return;
    }

    const data: LogInInput = {
      email: email.value,
      password: password.value
    };
    const res = await logIn(data);
    if ('token' in res) {
      setCookie(AuthorizationCookie, 'Bearer ' + res.token);
      goto(`${$page.params.lang}/dashboard`);
    } else {
      if ('code' in res && res.code == ErrorCode[ErrorCode.ValidationError]) {
        clientError.style.display = 'block';
      } else {
        internalError.style.display = 'block';
      }
    }
  }
</script>

<div class="login">
  <h1>{$t('session.log-in-title')}</h1>
  <form action="#" method="POST" id="login-form">
    <div class="form-group">
      <label for="email">{$t('session.email')}</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div class="form-group">
      <label for="password">{$t('session.password')}</label>
      <input type="password" id="password" name="password" required />
    </div>
    <div class="form-group">
      <div id="internal-error" class="error-msg">{$t('session.problems')}</div>
      <div id="client-error" class="error-msg">{$t('session.invalid-credentials')}</div>
      <button class="button" type="submit" onclick={(e: Event) => login(e)}
        >{$t('session.log-in')}</button
      >
    </div>
    <div class="form-group links">
      <a href={`/${$page.params.lang}/password-recovery`}>{$t('session.forgot-password')}</a><br />
      <a href={`/${$page.params.lang}/sign-up`}>{$t('session.no-account')}</a>
    </div>
  </form>
</div>

<style>
  .login {
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 5rem;
    margin-bottom: 5rem;
    padding: 1rem;
    width: 24rem;
  }

  h1 {
    font-size: 1.3em;
    text-align: center;
  }

  label,
  input {
    display: block;
  }

  input {
    border: 1px solid var(--primary-color);
    width: 100%;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .error-msg {
    margin-bottom: 15px;
    display: none;
  }

  .links {
    margin-top: 3rem;
    font-size: 0.9em;
  }
</style>
