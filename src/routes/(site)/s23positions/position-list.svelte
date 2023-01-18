<script lang="ts">
  import Position from './position.svelte';
  import type { ClubPosition } from './position';
  import type { TOOLS } from './data';

  export let data: ClubPosition<keyof typeof TOOLS>[];
</script>

{#each data as position}
  <section class="position">
    <Position data={position} />
  </section>
{:else}
  <p>There are no open positions at this time.</p>
{/each}
