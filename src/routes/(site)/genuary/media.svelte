<script lang="ts">
  export let video: boolean;
  export let src: string;
  export let view = '';
  export let alt = '';
  export let rounded = false;
</script>

<svelte:element
  this={video ? 'video' : 'img'}
  class="media"
  {src}
  {alt}
  class:wide={view === 'wide'}
  class:tall={view === 'tall'}
  class:big={view === 'big'}
  autoplay={video}
  loop={video}
  muted={true}
  playsinline={video}
  style:--border-radius={rounded ? '5px' : undefined}
/>

<style lang="scss">
  .media {
    max-width: 100%;
    vertical-align: middle;
    display: inline-block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--border-radius, 0);
  }

  .media.wide {
    width: 100%;
    height: auto;
  }

  .media.tall {
    width: auto;
    height: 100%;
  }

  .media.big {
    width: 100%;
    height: 100%;
  }
</style>
