<script>
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import Hero from './hero.svelte';
  import Desc from './desc.svelte';
  import Teams from './teams.svelte';
  import Lucky from './lucky.svelte';
  // import Blog from './blog.svelte';
</script>

<svelte:head>
  <title>ACM at CSUF</title>
</svelte:head>

<div class="sections-container">
  <div class="section-container">
    <Spacing --min="175px" --med="200px" --max="200px" />

    <Hero />

    <Spacing --min="120px" --med="175px" --max="200px" />
  </div>

  <div class="section-container">
    <Spacing --min="175px" --med="200px" --max="200px" />

    <Desc />

    <Spacing --min="120px" --med="175px" --max="200px" />
  </div>

  <div class="section-container">
    <Spacing --min="175px" --med="200px" --max="200px" />

    <Teams />

    <Spacing --min="120px" --med="175px" --max="200px" />
  </div>

  <!-- <div class="section-container">
    <Spacing --min="175px" --med="200px" --max="200px" />

    <Testimony /> 

    <Spacing --min="120px" --med="175px" --max="200px" /> 
  </div> -->

  <div class="section-container">
    <Spacing --min="175px" --med="200px" --max="200px" />

    <Lucky />

    <!-- <Spacing --min="120px" --med="175px" --max="200px" /> -->
  </div>

  <!-- <div class="section-container">
    <Spacing --min="175px" --med="200px" --max="200px" />

    <Blog />

    <Spacing --min="75px" --med="100px" --max="120px" />
  </div> -->
</div>

<style>
  .section-container {
    background-color: var(--acm-odd);
  }

  .section-container:nth-child(even) {
    background-color: var(--acm-even);
  }
</style>
