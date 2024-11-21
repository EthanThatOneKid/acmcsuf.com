<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import TeamTable from './team-table.svelte';
  import Workshop from './workshop.svelte';
  let ws = [['hi', 'now', 'hi there'], ['bye', 'yesterday', 'bye there']];
  let teams = ["OSS", "AI", "Dev", "Algo"];
</script>



<Spacing --min="125px" --med="150px" --max="150px" />

{#each {length: 4} as _, i}
  <TeamTable team={teams[i]} data={ws} />
{/each}

<Spacing --min="125px" --med="150px" --max="150px" />

<style>
  
</style>