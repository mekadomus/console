<script lang="ts">
  import { page } from '$app/stores';

  import { t, locale, loadTranslations } from '@utils/translations';

  let lang = $state($page.params.lang);
  locale.set($page.params.lang);
  $effect(() => {
    lang = $page.params.lang;
    locale.set(lang);
    loadTranslations(lang, 'meter');
  });

  type Props = {
    data: {
      meter_id: string;
      meter_name: string;
    };
  };
  let props: Props = $props();
  let meter_id = $state(props.data.meter_id);
  let meter_name = $state(props.data.meter_name);
</script>

<div class="success-msg msg">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html $t('meter.created', { meter_name: meter_name, meter_id: meter_id } as Record<
    string,
    string
  >)}
</div>

<style>
  .msg {
    margin: 0 auto;
    margin-top: 5rem;
    margin-bottom: 5rem;
    width: 34rem;
  }
</style>
