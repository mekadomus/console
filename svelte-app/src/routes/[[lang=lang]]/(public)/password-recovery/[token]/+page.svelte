<script lang="ts">
  import { SvelteMap } from 'svelte/reactivity';
  import { getContext } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { zxcvbn } from '@zxcvbn-ts/core';

  import type { Message } from '@api/Message';
  import type { NewPasswordInput } from '@api/User';

  import MdCenteredContainer from '@components/MdCenteredContainer.svelte';
  import { MessageType } from '@api/Message';
  import { setNewPassword } from '@api/User';
  import { t, locale, loadTranslations } from '@utils/translations';

  let lang = $state($page.params.lang);
  locale.set($page.params.lang);
  $effect(() => {
    lang = $page.params.lang;
    locale.set(lang);
    loadTranslations(lang, 'session');
  });

  const globalMessages: SvelteMap<string, Message> = getContext('globalMessages');

  type Props = {
    data: {
      token: string;
    };
  };
  let props: Props = $props();

  async function newPassword(e: Event) {
    e.preventDefault();

    const form = document.getElementById('np-form') as HTMLFormElement;
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

    const data: NewPasswordInput = {
      token: props.data.token,
      password: password.value
    };
    const status = await setNewPassword(data);
    if (status == 200) {
      goto(`/${$page.params.lang}/`);
    } else if (status == 400) {
      let message: Message = {
        type: MessageType.Error,
        text: $t('session.invalid-reset-token')
      };
      globalMessages.set('new-password-error', message);
    } else {
      let message: Message = {
        type: MessageType.Error,
        text: $t('session.error-resetting')
      };
      globalMessages.set('new-password-error', message);
    }
  }
</script>

<MdCenteredContainer>
  <h1>{$t('session.choose-password')}</h1>
  <form action="#" method="POST" id="np-form">
    <div class="form-group">
      <label for="password">{$t('session.password')}</label>
      <input type="password" id="password" name="password" required />
    </div>
    <div class="form-group">
      <button class="button" type="submit" onclick={(e: Event) => newPassword(e)}
        >{$t('session.update-password')}</button
      >
    </div>
  </form>
</MdCenteredContainer>

<style>
  button {
    margin-top: 1rem;
  }
</style>
