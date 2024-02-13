<script lang="ts">
  import { page } from '$app/stores';
  import ErrorGame from '$lib/components/error-game/game.svelte';
</script>

<svelte:head>
  <title>ACM at CSUF / {$page.status || 404}</title>
</svelte:head>

<ErrorGame />
