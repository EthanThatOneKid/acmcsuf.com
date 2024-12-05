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
  <h1 slot="headline" class="size-xl acm-heavier">Design Gallery | Summer 2024</h1>

  <p slot="text" class="size-md">
    The Summer Design Challenge, hosted by our Design Team, allows for fellow members to practice
    and show off their design skills using Figma while enjoying their summer vacation. Here are ten
    professional designs. You can check out more designs in our Discord server in the #🎨design-chat
    channel.
  </p>
</Block>

<ul>
  {#each ENTRIES as { day, imageSrc, discordUsername, prompt }}
    <li>
      <img src={imageSrc} alt="Design by @{discordUsername} day {day}" />
      <h2>Day {day} by <span class="acm-pink">@{discordUsername}</span></h2>
      <p class="size-md">Prompt: {prompt}</p>
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
    width: min(600px, 80vw);
  }

  img {
    width: 100%;
    height: 40vh;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    li * {
      font-size: 18px; /* Smaller font size for mobile */
    }
    img {
      height: 100%;
    }
  }

  img:hover {
    opacity: 0.5;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 0.5rem;
  }

  p {
    text-align: center;
    margin-bottom: 2rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
</style>
