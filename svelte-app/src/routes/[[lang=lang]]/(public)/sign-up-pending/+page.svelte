<script lang="ts">
  import { page } from '$app/stores';

  import { t, locale, loadTranslations } from '@utils/translations';

  let lang = $state($page.params.lang);
  locale.set($page.params.lang);
  $effect(() => {
    lang = $page.params.lang;
    locale.set(lang);
    loadTranslations(lang, 'session');
  });
</script>

<div class="success-msg">{$t('session.confirmation-email-sent')}</div>

<style>
  .success-msg {
    margin: 0 auto;
    margin-top: 5rem;
    width: 34rem;
  }
</style>
