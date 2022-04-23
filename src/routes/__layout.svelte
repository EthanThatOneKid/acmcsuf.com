<script lang="ts">
  import Navbar from '$lib/components/sections/navbar.svelte';
  import Footer from '$lib/components/sections/footer.svelte';
  import AcmToaster from '$lib/components/utils/acm-toaster.svelte';
  import { AcmTheme, theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';

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
