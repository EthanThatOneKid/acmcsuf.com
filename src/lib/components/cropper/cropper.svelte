<script lang="ts">
  import { browser } from '$app/environment';
  import BoardMember from '$lib/components/board-member/board-member.svelte';
  import { debounceable } from './debounce';
  import { makeCropper } from './cropper';
  import TeamPicker from '../board-member/team-picker.svelte';

  let input = '';
  let output = debounceable('', 100);

  let c: Cropper;
  let img: HTMLImageElement;
  let teamName = 'General';
  let teamClass = 'acm-blue';
  let teamColor = '--var(--acm-general-rgb)';

  function handleCrop(uri: string) {
    $output = uri;
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
    reader.addEventListener('load', (ev) => {
      console.log({ ev });
      if (typeof ev.target?.result === 'string') {
        input = ev.target.result;
      }
    });
    reader.addEventListener('error', (e) => console.error(e));

    reader.readAsDataURL(f);
  }

  function handleTeamChange(ev: CustomEvent) {
    console.log({ ev });
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
  <div class="cropper__container">
    <img src={input} bind:this={img} alt="Cropper input value" class="cropper" />
    <TeamPicker on:change={handleTeamChange} />
  </div>
{/if}

{#if $output}
  <BoardMember src={$output} {teamClass} {teamName} {teamColor} />
{/if}

<!-- TODO:
- [ ] Add more controls for the cropper (e.g. reset, rotate, etc.)
- [ ] Add a preview of the cropped image.
- [ ] Add a save button to save the cropped WEBP image.
-->
<style>
  .cropper {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }

  .cropper__container {
    width: 200px;
    height: 200px;
    overflow: hidden;
  }
</style>
