<script lang="ts">
  export let src: string;
  export let alt: string;
</script>

<img {src} {alt} />

<style lang="scss">
  :global(body.dark) {
    img {
      filter: invert(1);
    }
  }
</style>
