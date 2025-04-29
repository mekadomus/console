<script lang="ts">
  import { page } from '$app/stores';

  import { t, locale, loadTranslations } from '@utils/Translations';

  let lang = $state($page.params.lang);
  locale.set($page.params.lang);
  $effect(() => {
    lang = $page.params.lang;
    locale.set(lang);
    loadTranslations(lang, 'navigation');
  });
</script>

<nav>
  <span><a href={`/${lang}/dashboard`}>{$t('navigation.dashboard')}</a></span>
  <span><a href={`/${lang}/meter/new`}>{$t('navigation.create-meter')}</a></span>
</nav>

<style>
  nav {
    font-size: 0.9em;
    border-bottom: 1px solid var(--primary-color);
    display: flex;
  }

  span a {
    display: block;
    padding: 0.5rem;
    text-decoration: none;
    color: var(--primary-color);
  }

  span:hover a {
    background-image: linear-gradient(rgb(0 0 0/10%) 0 0);
  }
</style>
