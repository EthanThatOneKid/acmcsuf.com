<script lang="ts">
  import Hackathon from './hackathon.svelte';
  import HACKATHONS from './data';
  import Spacing from '$lib/public/legacy/spacing.svelte';
</script>

<svelte:head>
  <title>Hackthons | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<div class="hackathons">
  <h1>Hackathons</h1>

  <div>
    {#each HACKATHONS as hackathon (hackathon.id)}
      <Hackathon data={hackathon} />
    {/each}
  </div>
</div>

<style>
  .hackathons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
