<script lang="ts">
  import { SvelteMap } from 'svelte/reactivity';
  import { getContext } from 'svelte';
  import { page } from '$app/stores';

  import type { ErrorResponse } from '@api/Error';
  import type { FluidMeter } from '@api/FluidMeter';
  import type { Message } from '@api/Message';
  import type { PaginatedResponse } from '@api/Common';

  import MdTable from '@components/MdTable.svelte';
  import { MessageType } from '@api/Message';
  import { getFluidMetersBrowser } from '@api/FluidMeter';
  import { t, locale, loadTranslations } from '@utils/translations';

  let lang = $state($page.params.lang);
  locale.set($page.params.lang);
  $effect(() => {
    lang = $page.params.lang;
    locale.set(lang);
    loadTranslations(lang, 'dashboard');
    loadTranslations(lang, 'common');
  });

  const globalMessages: SvelteMap<string, Message> = getContext('globalMessages');

  type Props = {
    data: {
      meters: PaginatedResponse<FluidMeter>;
      error: ErrorResponse;
    };
  };

  let props: Props = $props();

  function prepareMetersForTable(meters: FluidMeter[]) {
    return meters.map((v) => {
      return [
        `<a href="${`/${$page.params.lang}/meter/${v.id}`}">${v.name}</a>`,
        v.id,
        v.status,
        new Date(v.recorded_at).toLocaleString()
      ];
    });
  }

  const meters = props.data.meters;
  let i = prepareMetersForTable(meters.items);
  let items = $state(i);
  let error = $state(props.data.error);
  let hasMore: (() => void) | null = $state(null);

  async function loadMore(after: string) {
    let r = await getFluidMetersBrowser(after);
    if ('items' in r) {
      items = prepareMetersForTable(r.items);

      if (r.pagination.has_more) {
        hasMore = () => {
          loadMore(r.items[r.items.length - 1].id);
        };
      } else {
        hasMore = null;
      }
    } else {
      let message: Message = {
        type: MessageType.Error,
        text: $t('dashboard.error-getting-meters')
      };
      globalMessages.set('new-meter-error', message);
    }
  }

  let pagination = meters.pagination;
  if (pagination) {
    if (pagination.has_more) {
      hasMore = () => {
        loadMore(meters.items[meters.items.length - 1].id);
      };
    }
  }
</script>

{#if error}
  <div class="error-msg msg">{$t('common.generic-error')}</div>
{/if}

{#if items}
  {#if items.length}
    <div class="container">
      <MdTable
        {items}
        headers={[
          $t('dashboard.name'),
          $t('dashboard.id'),
          $t('dashboard.status'),
          $t('dashboard.creation-date')
        ]}
        moreCallback={hasMore}
      />
    </div>
  {:else}
    <div class="warning-msg msg">{$t('dashboard.no-meters')}</div>
    <a class="button" href={`/${$page.params.lang}/meter/new`}>{$t('dashboard.new-meter')}</a>
  {/if}
{/if}

<style>
  .msg {
    margin: 1rem;
  }

  .button {
    display: block;
    width: 10rem;
    font-size: 0.9em;
  }

  .container {
    margin: 0 auto;
    margin-top: 1rem;
    width: 80%;
  }
</style>
