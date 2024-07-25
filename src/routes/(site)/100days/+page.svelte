<script lang="ts">
  import Block from '$lib/components/block/block.svelte';
  import Spacing from "$lib/public/legacy/spacing.svelte";
</script>

<svelte:head>
  <title>100 Days of Design | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />
<Block>
  <h1 slot="headline" class="size-xl acm-heavier">100 Days of Design | Summer 2024</h1>

  <p slot="text" class="size-md">
    The 100 Days of Design Challenge, hosted by our Design Team, allows for fellow members to practice and show off their Figma design skills
    while enjoying their summer vacation (*Margaritaville by Jimmy Buffett starts playing).
  </p>
</Block>


<Spacing --min="175px" --med="200px" --max="200px" />

<style>
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  ul > li {
    margin: 15px;
    text-align: center;
    width: min(80vw, 600px);
  }

  img {
    width: 100%;
  }

  img:hover {
    opacity: 0.5;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
  p {
    text-align: center;
    margin-bottom: 2rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
</style>