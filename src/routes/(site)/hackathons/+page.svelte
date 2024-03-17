<script lang="ts">
  import Hackathon from './hackathon.svelte';
  import HACKATHONS from './data';
</script>

<svelte:head>
  <title>Hackthons | ACM at CSUF</title>
</svelte:head>

<div class="hackathons">
  <h1>Hackathons</h1>

  <div>
    {#each HACKATHONS as hackathon}
      <Hackathon data={hackathon} />
    {/each}
  </div>
</div>

<style>
  .hackathons {
    padding-top: 100px;
  }
</style>
