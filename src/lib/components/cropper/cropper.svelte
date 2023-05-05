<script lang="ts">
  import { browser } from '$app/environment';
  import { debounceable } from './debounce';
  import { makeCropper } from './cropper';
  import BoardMember from '$lib/components/board-member/board-member.svelte';

  let input = '';
  let output = debounceable<null | HTMLCanvasElement>(null, 100);

  let c: Cropper;
  let img: HTMLImageElement;
  let link = '';
  let teamColor = '--var(--acm-general-rgb)';

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

    link = (await uploadFile(blob)).toString();
  }

  async function uploadFile(blob: Blob): Promise<URL> {
    const formData = new FormData();
    formData.append('file', blob, 'picture.webp');

    // Upload to Discord.
    const response = await fetch('https://discord-uploader.netlify.app/upload', {
      method: 'POST',
      body: formData,
    });
    const responseBody = await response.json();

    // Parse link from Discord response.
    if (responseBody?.attachments.length !== 1) {
      throw new Error('Discord response does not contain exactly one attachment.');
    }

    return new URL(responseBody.attachments[0].proxy_url);
  }

  $: if (browser && img) {
    c = makeCropper(img, handleCrop);
  }

  type FileInputEvent = Event & {
    currentTarget: EventTarget & HTMLInputElement & { files: FileList | null };
  };

  function handleInputChange(ev: FileInputEvent) {
    const { 0: f } = ev.currentTarget?.files ?? [];
    if (!f) return;

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      if (typeof event.target?.result === 'string') {
        input = event.target.result;
      }
    });
    reader.addEventListener('error', (e) => console.error(e));

    reader.readAsDataURL(f);
  }

  function handleTeamChange(event: CustomEvent) {
    console.log({ event });
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
  <div class="output-container">
    <p class="brand-em">Output:</p>
    <BoardMember src={$output.toDataURL('image/webp')} {teamColor} />
  </div>

  <button on:click={handleSubmit}>Submit</button>
{/if}

{#if link}
  <div class="link-container">
    <br />
    <br />
    <br />

    <a class="brand-em" href={link} target="_blank" rel="noopener noreferrer"> Your link </a>
  </div>
{/if}

<style>
  .cropper {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }

  .cropper-container {
    width: 200px;
    height: 200px;
    overflow: hidden;
  }
</style>
