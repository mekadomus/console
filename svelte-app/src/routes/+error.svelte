<script lang="ts">
  import { page as pageState } from '$app/state';
  import { page } from '$app/stores';

  import '@src/app.css';
  import MdHeader from '@components/MdHeader.svelte';
  import { t, locale, loadTranslations } from '@utils/Translations';

  let lang = 'en';
  if ($page.url.pathname.split('/')[1] === 'es') {
    lang = 'es';
  }
  locale.set(lang);
  loadTranslations(lang, 'error');
</script>

<div>
  <MdHeader />
  {#if pageState.status === 404}
    <h1>{$t('error.not-found-message')}</h1>
    <a href={`/`}>{$t('error.home-link')}</a>
  {:else}
    <h1>{$t('error.unknown-message')}</h1>
  {/if}
</div>
