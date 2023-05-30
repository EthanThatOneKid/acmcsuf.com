<script lang="ts">
  import { browser } from '$app/environment';
  import Button from '$lib/components/button/button.svelte';
  import BoardMember from '$lib/components/board-member/board-member.svelte';
  import { copy } from '$lib/public/copy/copy';
  import BwIcon from '$lib/components/bw-icon/bw-icon.svelte';
  import { debounceable } from './debounce';
  import type { Cropper } from './cropper';
  import { makeCropper } from './cropper';
  import { uploadPicture } from './discord-uploader';

  let input = '';
  let output = debounceable<null | HTMLCanvasElement>(null, 100);

  let c: Cropper;
  let img: HTMLImageElement;
  let link = '';
  let teamColor = '';

  function handleCrop(canvas: HTMLCanvasElement) {
    $output = canvas;
  }

  function handleSubmit() {
    if ($output === null) {
      console.error('No output canvas.');
      return;
    }

    $output.toBlob(handleBlob, 'image/webp', 1);
  }

  async function handleBlob(blob: Blob | null) {
    if (blob === null) {
      console.error('No blob.');
      return;
    }

    link = (await uploadPicture(blob)).toString();
  }

  $: if (browser && img) {
    c = makeCropper(img, handleCrop);
    console.info(c);
  }

  type FileInputEvent = Event & {
    currentTarget: EventTarget & HTMLInputElement & { files: FileList | null };
  };

  function handleInputChange(ev: FileInputEvent) {
    const { 0: f } = ev.currentTarget?.files ?? [];
    if (!f) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      if (typeof event.target?.result === 'string') {
        input = event.target.result;
      }
    });
    reader.addEventListener('error', (e) => console.error(e));

    reader.readAsDataURL(f);
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css"
  />
</svelte:head>

<input type="file" accept=".jpg, .jpeg, .png, .gif" on:change={handleInputChange} />

{#if input}
  <div class="cropper-container">
    <img src={input} bind:this={img} alt="Cropper input value" class="cropper" />
  </div>
{/if}

{#if $output}
  <p class="brand-em">Output:</p>
  <div class="output-container">
    <BoardMember src={$output.toDataURL('image/webp')} {teamColor} />
  </div>

  <Button text="Submit" on:click={handleSubmit} />
{/if}

{#if link}
  <div class="link-container">
    <br />
    <br />
    <br />

    <p class="brand-em">Link: <a href={link} target="_blank"><code>{link}</code></a></p>

    <button
      class="action-item"
      title="Copy event link"
      on:click={() =>
        copy(link, 'Copied WEBP link to clipboard!', 'Failed to copy WEBP link to clipboard!')}
    >
      <BwIcon src="/assets/svg/copy-link.svg" alt="copy link" />
    </button>
  </div>
{/if}

<style>
  .cropper {
    display: block;
    max-height: fit-content;
    max-width: fit-content;
  }

  .cropper-container {
    min-height: 200px;
    min-width: 200px;
    max-height: min-content;
    max-width: min-content;
  }

  .output-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 4rem 0;
  }

  .link-container p {
    margin: 2rem 0;
  }

  .action-item {
    --size: 40px;
    color: var(--highlights);
    width: var(--size);
    height: var(--size);
    padding: calc(var(--size) * 0.15);
    box-shadow: 0 6px 18px rgba(var(--highlights, --acm-general-rgb), 0.25);
    transition: all 0.25s ease-in-out;
    border-radius: 30px;
    border: 2px solid var(--acm-dark);
    background-color: var(--acm-light);
  }
</style>
