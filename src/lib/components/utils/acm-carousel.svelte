<script lang="ts">
  import { rovingIndex } from '../../utils/roving-ux';

  export let events: unknown[] = [];
</script>

<section>
  <ul class="horizontal-media-scroller" use:rovingIndex={'a'}>
    {#each events as item (JSON.stringify(item))}
      <li>
        <a href="/#">
          <figure>
            <picture>
              <img alt="A placeholder" loading="lazy" src="https://picsum.photos/500/500?1" />
            </picture>
            <figcaption>
              <pre><code>{JSON.stringify(item, null, 2).slice(0, 30)}</code></pre>
            </figcaption>
          </figure>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  /* Adapted from https://github.com/argyleink/gui-challenges/blob/main/media-scroller/style.css */

  :root {
    --sm-space: 1rem;
    --md-space: 2rem;
  }

  section {
    --gap: var(--md-space);
    padding-block-start: calc(var(--md-space) * 2);
    padding-block-end: var(--md-space);
  }

  .horizontal-media-scroller {
    --size: 150px;
    display: grid;
    grid-auto-flow: column;
    gap: calc(var(--gap) / 2);
    margin: 0;
    -webkit-padding-start: var(--gap);
    padding-inline-start: var(--gap);
    -webkit-padding-end: var(--gap);
    padding-inline-end: var(--gap);
    -webkit-padding-before: calc(var(--gap) / 2);
    padding-block-start: calc(var(--gap) / 2);
    -webkit-padding-after: calc(var(--gap) / 2);
    padding-block-end: calc(var(--gap) / 2);
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    -ms-scroll-snap-type: inline mandatory;
    scroll-snap-type: inline mandatory;
    scroll-padding-left: var(--gap);
    scroll-padding-right: var(--gap);
    scroll-padding-inline: var(--gap);
  }

  @media (prefers-reduced-motion: no-preference) {
    .horizontal-media-scroller {
      scroll-behavior: smooth;
    }
  }

  .horizontal-media-scroller > li {
    display: inline-block;
  }

  .horizontal-media-scroller > li:last-of-type figure {
    position: relative;
  }

  .horizontal-media-scroller > li:last-of-type figure::after {
    content: '';
    position: absolute;
    inline-size: var(--gap);
    block-size: 100%;
    inset-block-start: 0;
    inset-inline-end: calc(var(--gap) * -1);
  }

  .horizontal-media-scroller figure {
    scroll-snap-align: start;
  }

  .horizontal-media-scroller a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    outline-offset: 12px;
  }

  .horizontal-media-scroller a:focus {
    outline-offset: 7px;
  }

  @media (prefers-reduced-motion: no-preference) {
    .horizontal-media-scroller a {
      transition: outline-offset 0.25s ease;
    }
  }

  figure {
    display: grid;
    gap: calc(var(--gap) / 2);
    margin: 0;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  @media (prefers-reduced-data: reduce) {
    figure {
      min-inline-size: var(--size);
    }

    figure > picture {
      display: none;
    }
  }

  figure > picture {
    inline-size: var(--size);
    block-size: var(--size);
  }

  figure img {
    inline-size: 100%;
    block-size: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 1ex;
    overflow: hidden;
    background-image: linear-gradient(to bottom, #666, #333);
  }

  figure > figcaption {
    font-size: 1.75rem;
    font-weight: 300;
    word-break: break-word;
    font-family: blokk;
  }

  :global(h2) {
    font-size: var(--md-space);
    font-weight: 800;
    letter-spacing: 0.75px;
  }

  :global(h3) {
    font-weight: 400;
    letter-spacing: 0.75px;
  }

  @supports (aspect-ratio: 1) {
    .horizontal-media-scroller figure > picture {
      inline-size: auto;
      aspect-ratio: 1;
    }

    section:nth-child(2) .horizontal-media-scroller figure > picture {
      aspect-ratio: 16/9;
    }

    section:nth-child(3) .horizontal-media-scroller figure > picture {
      block-size: calc(var(--size) * 2);
      aspect-ratio: 4/3;
    }

    @media (max-width: 480px) {
      section:nth-child(3) .horizontal-media-scroller figure > picture {
        block-size: calc(var(--size) * 1.5);
      }
    }
  }
</style>
