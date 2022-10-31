<script>
  // This +layout.svelte is a blank layout. It is used by the
  // pages that don't need a layout. It is also used as the base
  // layout of all pages.
  //
  // https://kit.svelte.dev/docs/advanced-routing#advanced-layouts

  import { page } from '$app/stores';
  import { browser, dev } from '$app/environment';
  import { VERCEL_ANALYTICS_ID } from '$env/static/public';
  import { send } from '$lib/public/analytics/vitals';

  $: if (browser && !dev && VERCEL_ANALYTICS_ID) {
    send({
      id: VERCEL_ANALYTICS_ID,
      path: $page.url.pathname,
      params: $page.params,
      navigator,
    });
  }
</script>

<slot />
