<script lang="ts">
  import { AcmTheme } from '$lib/public/legacy/theme';

  export let src: string;
  export let alt: string;
  export let width = 24;
  export let height = width;
  export let filterOn: AcmTheme[] = [AcmTheme.Dark];
</script>

<img
  {src}
  {alt}
  {width}
  {height}
  class:filter-dark={filterOn.includes(AcmTheme.Dark)}
  class:filter-light={filterOn.includes(AcmTheme.Light)}
/>

<style lang="scss">
  :global(html[data-theme='dark']) {
    .filter-dark {
      filter: invert(1);
    }
  }

  :global(html[data-theme='light']) {
    .filter-light {
      filter: invert(1);
    }
  }
</style>
