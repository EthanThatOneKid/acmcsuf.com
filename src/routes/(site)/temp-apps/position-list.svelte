<script lang="ts">
  import Position from './position.svelte';
  import type { ClubPosition } from './position';
  import type { TOOLS } from './data';

  export let data: ClubPosition<keyof typeof TOOLS>[];
</script>

{#each data as position}
  <Position data={position} />
{:else}
  <p>There are no open positions at this time.</p>
{/each}
