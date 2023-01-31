<script lang="ts">
  import type { CollagePiece } from './collage';

  export let data: CollagePiece[] = [];
</script>

<div class="grid-outer-wrapper">
  <div class="grid-inner-wrapper">
    {#each data as { src, view, alt: givenAlt }, i}
      {@const alt = givenAlt || src}
      {@const video = src.endsWith('.mp4') || src.endsWith('.mov')}
      <details class="modal artwork-container">
        <summary>
          {#if video}
            <video
              {src}
              autoplay
              loop
              muted
              playsinline
              class="artwork"
              class:wide={view === 'wide'}
              class:tall={view === 'tall'}
              class:big={view === 'big'}
              style:animation-delay={i * 2 + 's'}
            />
          {:else}
            <img
              {src}
              class="artwork"
              class:wide={view === 'wide'}
              class:tall={view === 'tall'}
              class:big={view === 'big'}
              {alt}
              style:animation-delay={i * 2 + 's'}
            />
          {/if}
        </summary>

        {#if video}
          <video {src} class="modal-artwork" autoplay loop muted playsinline />
        {:else}
          <img class="modal-artwork" {src} {alt} />
        {/if}
      </details>
    {/each}
  </div>
</div>

<!-- Reference: https://codepen.io/iamsaief/pen/jObaoKo -->
<style lang="scss">
  .modal {
    max-width: 100%;
    height: auto;
  }

  .modal summary {
    cursor: pointer;
    margin: 0;
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    display: inline-block;
  }

  .modal summary:hover {
    border: 1px solid black;
  }

  .grid-outer-wrapper {
    padding: 15px;
  }

  .artwork-container {
    max-width: 100%;
    height: auto;
  }

  /* Main CSS */
  .grid-inner-wrapper > .artwork-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .grid-inner-wrapper > .artwork-container > .artwork {
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
