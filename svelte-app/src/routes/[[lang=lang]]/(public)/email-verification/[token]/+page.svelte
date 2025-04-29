<script lang="ts">
  import { page } from '$app/stores';

  import { t, locale, loadTranslations } from '@utils/translations';

  let lang = $state($page.params.lang);
  locale.set($page.params.lang);
  $effect(() => {
    lang = $page.params.lang;
    locale.set(lang);
    loadTranslations(lang, 'email');
  });

  type Props = {
    data: {
      status: number;
    };
  };
  let props: Props = $props();
  let status = $state(props.data.status);
</script>

{#if status >= 200 && status < 300}
  <div class="success-msg msg">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html $t('email.verified')}
  </div>
{:else}
  <div class="error-msg msg">{$t('email.invalid-token')}</div>
{/if}

<style>
  .msg {
    margin: 0 auto;
    margin-top: 5rem;
    margin-bottom: 5rem;
    width: 34rem;
  }
</style>
