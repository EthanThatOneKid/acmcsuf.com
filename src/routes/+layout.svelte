<script>
  // This +layout.svelte is a blank layout. It is used by the
  // pages that don't need a layout. It is also used as the base
  // layout of all pages.
  //
  // https://kit.svelte.dev/docs/advanced-routing#advanced-layouts
  import Bar from '$lib/components/nav/bar.svelte';
  import Footer from '$lib/components/footer/footer.svelte';
</script>

<Bar />
<slot />
<Footer />
