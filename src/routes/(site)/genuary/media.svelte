<script lang="ts">
  export let video: boolean;
  export let src: string;
  export let view = '';
  export let alt = '';
  export let rounded = false;
</script>

<a href={src} class="media-container" target="_blank" rel="noopener noreferrer">
  <svelte:element
    this={video ? 'video' : 'img'}
    {src}
    {alt}
    class="media"
    class:wide={view === 'wide'}
    class:tall={view === 'tall'}
    class:big={view === 'big'}
    loading="lazy"
    autoplay={video}
    loop={video}
    muted={true}
    style:--border-radius={rounded ? '5px' : undefined}
  />
</a>

<style lang="scss">
  .media-container {
    max-width: 100%;
    vertical-align: middle;
    display: inline-block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--border-radius, 0);
  }

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
