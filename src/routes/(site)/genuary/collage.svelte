<script lang="ts">
  import type { CollagePiece } from './collage';

  export let data: CollagePiece[] = [];
</script>

<div class="grid-outer-wrapper">
  <div class="grid-inner-wrapper">
    {#each data as { src, view, alt: givenAlt }, i}
      {@const alt = givenAlt || src}
      <div>
        <img
          {src}
          class:wide={view === 'wide'}
          class:tall={view === 'tall'}
          class:big={view === 'big'}
          {alt}
          style:animation-delay={i * 2 + 's'}
        />
      </div>
    {/each}
  </div>
</div>

<!-- Reference: https://codepen.io/iamsaief/pen/jObaoKo -->
<style lang="scss">
  .grid-outer-wrapper {
    padding: 15px;
  }

  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    display: inline-block;
  }

  /* Main CSS */
  .grid-inner-wrapper > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .grid-inner-wrapper > div > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  .grid-inner-wrapper {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 200px;
    grid-auto-flow: dense;
  }

  .grid-inner-wrapper .wide {
    grid-column: span 2;
  }

  .grid-inner-wrapper .tall {
    grid-row: span 2;
  }

  .grid-inner-wrapper .big {
    grid-column: span 2;
    grid-row: span 2;
  }
</style>
