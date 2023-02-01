<script lang="ts">
  import ReadyUp from '../ready-up.svelte';
  import Block from '$lib/components/block/block.svelte';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import { TextAlignment } from '$lib/public/legacy/text-alignment';
  import Collage from './collage.svelte';
  import type { CollagePageData } from './collage';

  export let data: CollagePageData;
  export let year: string;
</script>

<svelte:head>
  <title>Genuary {year} | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<Block align={TextAlignment.LEFT}>
  <h1 slot="headline" class="size-lg">Genuary {year}</h1>
  <p slot="text" class="size-sm">
    Our chapter members' take on the Genuary challenge.
    <br />
    <br />
    <span class="brand-italic">
      Genuary is a challenge to create a piece of generative art every day in January.
      <br />
      <br />
      The artworks shared by members of our club throughout the course of Genuary 2023 are listed below.
    </span>
    <br />
    <br />
    Last updated January 31st, 2023
  </p>
</Block>

<Spacing --min="64px" --med="64px" --max="64px" />

<Collage data={data.pieces} />

<Spacing --min="64px" --med="64px" --max="64px" />

<Block align={TextAlignment.LEFT}>
  <div slot="text">
    <ReadyUp />
  </div>
</Block>

<Spacing --min="75px" --med="100px" --max="120px" />

<style lang="scss">
  section.collage-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 0 auto;

    .collage-container-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 1280px;
      padding: 0 16px;
      height: 600px;
    }
  }
</style>
