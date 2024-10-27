<script lang="ts">
  import Block from '$lib/components/block/block.svelte';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import { ENTRIES } from '$lib/public/design-gallery/data';
</script>

<svelte:head>
  <title>Design Gallery | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />
<Block>
  <h1 slot="headline" class="size-xl acm-heavier">100 Days of Design | Summer 2024</h1>

  <p slot="text" class="size-md">
    The 100 Days of Design Challenge, hosted by our Design Team, allows for fellow members to
    practice and show off their design skills using Figma while enjoying their summer vacation. Here
    are ten professional designs. (*Margaritaville by Jimmy Buffett starts playing).
  </p>
</Block>

<ul>
  {#each ENTRIES as { day, imageSrc, discordUsername, prompt }}
    <li>
      <h2>Day {day} by <span>@{discordUsername}</span></h2>
      <img src={imageSrc} alt="" />
      <p>Prompt: {prompt}</p>
    </li>
  {/each}
</ul>

<Spacing --min="175px" --med="200px" --max="200px" />

<style>
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
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
