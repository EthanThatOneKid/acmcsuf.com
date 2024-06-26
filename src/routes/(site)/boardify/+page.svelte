<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';
  import Cropper from '$lib/components/cropper/cropper.svelte';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import Block from '$lib/components/block/block.svelte';
  import { TextAlignment } from '$lib/public/text-alignment/text-alignment';
</script>

<svelte:head>
  <title>Boardify | ACM at CSUF</title>
</svelte:head>

<MetaTags
  openGraph={{
    title: 'Boardify | ACM at CSUF',
    description: 'Take on the Boardify challenge!',
    url: 'https://acmcsuf.com/boardify',
    type: 'website',
    article: {
      publishedTime: '2023-22-05T00:00:00.000Z',
      modifiedTime: '2023-22-05T00:00:00.000Z',
    },
  }}
/>

<Spacing --min="175px" --med="200px" --max="200px" />

<Block align={TextAlignment.LEFT}>
  <h1 slot="headline" class="size-lg">Boardify</h1>
  <p slot="text" class="size-sm">Take on the Boardify challenge!</p>
</Block>

<Block align={TextAlignment.LEFT}>
  <div slot="text">
    <p>
      <span class="acm-italic">
        Upload an image of your headshot, crop to your liking, and download the resulting ACM at
        CSUF board image. Copy the image link to your clipboard to share with your friends in ACM at
        CSUF!
      </span>
    </p>
    <p>ACM at CSUF board member instructions:</p>
    <ol class="board-instructions">
      <li>Upload your headshot.</li>
      <li>Drag the crop box to your liking.</li>
      <li>
        Copy the image link to your clipboard to share with your friends in the <a href="/discord"
          >ACM at CSUF Discord server</a
        >!
      </li>
    </ol>
  </div>
</Block>

<Spacing --min="64px" --med="64px" --max="64px" />

<Block align={TextAlignment.LEFT}>
  <div slot="text" class="cropper-block">
    <Cropper />
  </div>
</Block>

<Spacing --min="175px" --med="200px" --max="200px" />

<style>
  .board-instructions {
    list-style-type: decimal;
    padding-left: 1.5rem;
  }
</style>
