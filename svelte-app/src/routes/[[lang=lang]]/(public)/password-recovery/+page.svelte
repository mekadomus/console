<script lang="ts">
  import { SvelteMap } from 'svelte/reactivity';
  import { getContext } from 'svelte';
  import { page } from '$app/stores';

  import type { Message } from '@api/Message';
  import type { RecoverPasswordInput } from '@api/User';

  import { MessageType } from '@api/Message';
  import { recoverPassword } from '@api/User';
  import { t, locale, loadTranslations } from '@utils/translations';

  let lang = $state($page.params.lang);
  locale.set($page.params.lang);
  $effect(() => {
    lang = $page.params.lang;
    locale.set(lang);
    loadTranslations(lang, 'session');
    loadTranslations(lang, 'common');
  });

  const globalMessages: SvelteMap<string, Message> = getContext('globalMessages');

  async function recoverPasswordHandler(e: Event) {
    e.preventDefault();

    const form = document.getElementById('rp-form') as HTMLFormElement;
    const email = document.getElementById('email') as HTMLFormElement;

    form.reportValidity();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data: RecoverPasswordInput = {
      email: email.value
    };
    const status = await recoverPassword(data);
    if (status == 200) {
      let message: Message = {
        type: MessageType.Success,
        text: $t('session.recovery-sent')
      };
      globalMessages.set('password-recovery-error', message);
    } else {
      let message: Message = {
        type: MessageType.Error,
        text: $t('common.generic-error')
      };
      globalMessages.set('password-recovery-error', message);
    }
  }
</script>

<div class="recover-password">
  <h1>{$t('session.recover-password')}</h1>
  <form action="#" method="POST" id="rp-form">
    <div class="form-group">
      <label for="email">{$t('session.email')}</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div class="form-group">
      <button class="button" type="submit" onclick={(e: Event) => recoverPasswordHandler(e)}
        >{$t('session.recover-button')}</button
      >
    </div>
  </form>
</div>

<style>
  .recover-password {
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
</style>
