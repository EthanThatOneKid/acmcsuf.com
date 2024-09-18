<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ErrorGame from '$lib/components/error-game/game.svelte';
  let showGame = false;

  onMount(() => {
    // Only show the game component on the client
    showGame = true;
  });
</script>

<svelte:head>
  <title>ACM at CSUF / {$page.status || 404}</title>
</svelte:head>

{#if showGame}
  <ErrorGame />
{/if}
