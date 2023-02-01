<script lang="ts">
  import { onMount } from 'svelte';

  import Dialog from './dialog.svelte';
  import Media from './media.svelte';

  import type { CollagePiece } from './collage';

  export let data: CollagePiece[] = [];

  const anchors: HTMLAnchorElement[] = [];

  onMount(() => {
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
  });
</script>

<div class="grid-outer-wrapper">
  <div class="grid-inner-wrapper">
    {#each data as { src, view, alt: givenAlt }, i}
      {@const alt = givenAlt || src}
      {@const video = src.endsWith('.mp4') || src.endsWith('.mov')}
      {@const ext = src.split('.').pop()}
      <div class="artwork-container">
        <a
          class="artwork"
          bind:this={anchors[i]}
          href={src}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Dialog>
            <Media {src} {video} {alt} {view} slot="opener" rounded={true} />

            <section slot="content" class="enlarged">
              <Media {src} {video} {alt} />

              <span class="caption">{alt} <span class="subcaption">.{ext}</span></span>
            </section>

            <div class="closer-container" slot="closer">
              <span role="button" class="closer">Close</span>
            </div>
          </Dialog>
        </a>
      </div>
    {/each}
  </div>
</div>

<!-- Reference: https://codepen.io/iamsaief/pen/jObaoKo -->
<style lang="scss">
  .grid-outer-wrapper {
    padding: 15px;
  }

  .artwork-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .artwork {
    max-width: 100%;
    vertical-align: middle;
    display: inline-block;
    width: 100%;
    height: 100%;
    object-fit: cover;
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

  .closer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .closer {
    display: inline-block;
    padding: 10px 20px;
    border: 1px solid var(--perma-dark);
    border-radius: 5px;
    color: var(--perma-dark);
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
  }

  .closer:hover,
  .closer:focus {
    background-color: var(--acm-blue);
    border: 1px solid var(--perma-light);
    color: var(--perma-light);
    cursor: pointer;
  }

  .caption {
    display: block;
    margin: 10px 0;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    color: var(--perma-dark);
  }

  .subcaption {
    font-size: 1rem;
    font-weight: 400;
    color: var(--perma-dark);
  }
</style>
