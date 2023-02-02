<script lang="ts">
  import type { CollagePiece } from './collage';

  export let data: CollagePiece;
  export let rounded = false;

  const video = data.src.endsWith('.mp4') || data.src.endsWith('.mov');

  let media: HTMLVideoElement | HTMLImageElement;

  function onInit() {
    if (video) {
      let videoElem = media as HTMLVideoElement;
      videoElem.controls = false;
      videoElem.muted = true;
    }
  }

  function handleLoad() {
    if (video) {
      (media as HTMLVideoElement).play();
    }
  }
</script>

<svelte:element
  this={video ? 'video' : 'img'}
  bind:this={media}
  on:loadeddata={handleLoad}
  on:loadstart={onInit}
  src={data.src}
  alt={data.alt}
  class="media {data.view}"
  controls
  loading="lazy"
  loop={video}
  playsinline={video}
  style:--border-radius={rounded ? '5px' : undefined}
/>

<style lang="scss">
  .media {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--border-radius, 0);
  }

  .media-container.wide {
    width: 100%;
    height: auto;
  }

  .media-container.tall {
    width: auto;
    height: 100%;
  }

  .media-container.big {
    width: 100%;
    height: 100%;
  }
</style>
