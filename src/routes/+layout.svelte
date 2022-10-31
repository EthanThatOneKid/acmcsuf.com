<script>
  // This +layout.svelte is a blank layout. It is used by the
  // pages that don't need a layout. It is also used as the base
  // layout of all pages.
  //
  // https://kit.svelte.dev/docs/advanced-routing#advanced-layouts

  import { inject } from '@vercel/analytics';
  import { page } from '$app/stores';
  import { browser, dev } from '$app/environment';
  import { VERCEL_ANALYTICS_ID } from '$env/static/public';
  import { send } from '$lib/public/analytics/vitals';

  $: if (browser && !dev && VERCEL_ANALYTICS_ID) {
    inject({
      beforeSend() {
        send({
          id: VERCEL_ANALYTICS_ID,
          path: $page.url.pathname,
          params: $page.params,
          navigator,
        });

        return null;
      },
    });
  }
</script>

<slot />
