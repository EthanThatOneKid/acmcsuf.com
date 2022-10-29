<script lang="ts">
  export let src: string;
  export let alt: string;
  export let width = 24;
  export let height = width;
</script>

<img {src} {alt} {width} {height} />

<style lang="scss">
  :global(body.dark) {
    img {
      filter: invert(1);
    }
  }
</style>
