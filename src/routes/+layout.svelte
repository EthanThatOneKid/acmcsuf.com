<script lang="ts">
  import { prefetch } from '$app/navigation';
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/nav/bar.svelte';
  import Footer from '$lib/components/footer/footer.svelte';
  import AcmToaster from '$lib/components/toaster/toaster.svelte';
  import { AcmTheme, theme } from '$lib/public/legacy/theme';

  function changeTheme(event: MediaQueryListEvent) {
    theme.set(event.matches ? AcmTheme.Dark : AcmTheme.Light);
  }

  onMount(() => {
    theme.init();

    if ('matchMedia' in window) {
      const mediaList = matchMedia('(prefers-color-scheme: dark)');
      mediaList.addEventListener('change', changeTheme);
      return () => mediaList.removeEventListener('change', changeTheme);
    }

    // refetch used here to improve the load time of the events page, see #530
    // https://kit.svelte.dev/docs/modules#$app-navigation-prefetch
    prefetch('/events');
  });
</script>

<Navbar />
<main><slot /></main>
<Footer />
<AcmToaster />

<svelte:head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<style>
  main {
    min-height: 100vh;
  }
</style>
