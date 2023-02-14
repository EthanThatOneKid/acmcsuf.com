<script lang="ts">
  import Cropper from '$lib/components/cropper/index.svelte';
  import { getCroppedImg } from '$lib/components/cropper/canvasUtil';

  let cropX: string;
  let cropY: string;
  let profileWidth: string;

  let image: string | null | undefined;
  let fileinput: HTMLInputElement;
  let pixelCrop: any;
  let croppedImage: any;

  const defaultSrc = 'https://cdn1-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg';

  function onFileSelected(
    e: Event & { currentTarget: EventTarget & HTMLInputElement & { files: FileList } }
  ) /*: Event & { currentTarget: EventTarget & HTMLInputElement;target?:})*/ {
    let imageFile = e.currentTarget?.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      image = e.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  }

  let profilePicture: HTMLImageElement;
  let style: any;

  function previewCrop(e: { detail: { pixels: { x: any; y: any; width: any } } }) {
    pixelCrop = e.detail.pixels;
    const { x, y, width } = e.detail.pixels;
    const scale = 200 / width;

    // TODO: Pass as reactive CSS variables
    cropX = `${-x * scale}px`;
    cropY = `${-y * scale}px`;
    profileWidth = `${profilePicture.naturalWidth * scale}px`;
    // TODO: rewrite to CSS c
  }

  async function cropImage() {
    croppedImage = await getCroppedImg(image, pixelCrop);
  }

  function reset() {
    croppedImage = null;
    image = null;
  }
</script>

{#if !image}
  <h2>Upload a picture for cropping?</h2>
  <input
    type="file"
    accept=".jpg, .jpeg, .png"
    on:change={(e) => onFileSelected(e)}
    bind:this={fileinput}
  />
  <h2>Or... use this cute dog 🐕</h2>
  <button
    type="button"
    on:click={() => {
      image = defaultSrc;
    }}>Click me!</button
  >
{:else}
  <h2>svelte-easy-crop</h2>
  <div style="position: relative; width: 100%; height: 50%;">
    <Cropper {image} aspect={1} zoom="1" crop={{ x: 0, y: 0 }} on:cropcomplete={previewCrop} />
  </div>
  <h2>Preview</h2>
  <div class="prof-pic-wrapper">
    {#if !!image}
      <img bind:this={profilePicture} 
      style:--crop-x={cropX}
      style:--crop-y={cropY}
      style:--profile-width={profileWidth}
      class="prof-pic" src={image} alt="Profile example" {style} />
    {/if}
  </div>
  {#if croppedImage}
    <h2>Cropped Output</h2>
    <img src={croppedImage} alt="Cropped profile" /><br />
  {:else}
    <br /><button
      type="button"
      on:click={async () => {
        croppedImage = await getCroppedImg(image, pixelCrop);
      }}>Crop!</button
    >
  {/if}
  <button type="button" on:click={reset}>Start over?</button>
{/if}

<style>
  .prof-pic-wrapper {
    height: 200px;
    width: 200px;
    position: relative;
    border: solid;
    overflow: hidden;
  }

  .prof-pic {
    position: absolute;
    margin: var(--crop-y) 0 0 var(--crop-y);
    width: var(--profile-width);
  }
</style>
