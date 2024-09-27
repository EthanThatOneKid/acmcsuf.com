<script lang="ts">
  import { page } from '$app/stores';
  import Bar from '$lib/components/nav/bar.svelte';
  import Footer from '$lib/components/footer/footer.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { AcmTheme, theme } from '$lib/public/legacy/theme';
  import ErrorGame from '$lib/components/error-game/game.svelte';

  function changeTheme(event: MediaQueryListEvent) {
    theme.set(event.matches ? AcmTheme.Dark : AcmTheme.Light);
  }

  function preventKeyScroll(event: KeyboardEvent) {
    // Prevent spacebar and down arrow from scrolling (interferes with game)
    if (event.code === 'Space' || event.code === 'ArrowDown') {
      event.preventDefault();
    }
  }

  onMount(() => {
    theme.init();

    const mediaList = window.matchMedia('(prefers-color-scheme: dark)');
    mediaList.addEventListener('change', changeTheme);

    window.addEventListener('keydown', preventKeyScroll);

    onDestroy(() => {
      mediaList.removeEventListener('change', changeTheme);
      window.removeEventListener('keydown', preventKeyScroll);
    });
  });
</script>

<main>
  <Bar />
  <div class="content">
    <ErrorGame />
  </div>
</main>

<svelte:head>
  <title>ACM at CSUF / {$page.status || 404}</title>
</svelte:head>

<Footer />

<style>
  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content {
    flex: 1; 
  }
</style>
