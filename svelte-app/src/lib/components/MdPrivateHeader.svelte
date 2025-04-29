<script lang="ts">
  import { SvelteMap } from 'svelte/reactivity';
  import { getContext } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import MdLocalePicker from '@components/MdLocalePicker.svelte';
  import { AuthorizationCookie } from '@utils/Constants';
  import { MessageType } from '@api/Message';
  import { deleteCookie } from '@utils/Cookies';
  import { logOut } from '@api/User';
  import { t, locale, loadTranslations } from '@utils/translations';

  import type { Message } from '@api/Message';

  let lang = $state($page.params.lang);
  locale.set($page.params.lang);
  $effect(() => {
    lang = $page.params.lang;
    locale.set(lang);
    loadTranslations(lang, 'header');
    loadTranslations(lang, 'common');
  });

  const globalMessages: SvelteMap<string, Message> = getContext('globalMessages');

  async function logout() {
    const status = await logOut();
    if (status == 200) {
      deleteCookie(AuthorizationCookie);
      goto(`/${lang}/`);
    } else {
      let message: Message = {
        type: MessageType.Error,
        text: $t('common.generic-error')
      };
      globalMessages.set('sign-out-error', message);
    }
  }
</script>

<header>
  <a href={`/${lang}/dashboard`}
    ><img alt="Mekadomus logo" src="/header-logo.png" width="150" height="85" />
  </a>
  <div class="controls">
    <div>
      <MdLocalePicker />
    </div>
    <button id="log-out" onclick={() => logout()}>{$t('header.logout')}</button>
  </div>
</header>

<style>
  header {
    border-bottom: 2px solid var(--primary-color);
    padding: 0.5rem 2rem;
    color: var(--secondary-color-weak);
    display: flex;
    justify-content: space-between;
  }

  button {
    border: none;
    background: none;
    font-size: 1.2em;
    color: var(--primary-color);
    font-weight: bold;
    cursor: pointer;
  }

  button:hover {
    filter: saturate(0.5);
  }

  .controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
