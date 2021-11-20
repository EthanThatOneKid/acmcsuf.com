<script lang="ts">
  import type { SvelteComponentTyped } from 'svelte';
  import { rovingIndex } from '../../utils/roving-ux';

  // customize which element is focused
  export let focusableSelector = 'li';

  // pass array of ambiguously-structured data to carousel
  export let data: unknown[] = [];

  // pass a typed card component to carousel (https://stackoverflow.com/a/67737182)
  export let card: new (...args: any[]) => SvelteComponentTyped<{ info: unknown }>;

  // use a more appropriate variable name
  const CardComponent = card;
</script>

<ul use:rovingIndex={focusableSelector}>
  {#each data as item (JSON.stringify(item))}
    <li>
      <CardComponent info={item} />
    </li>
  {/each}
</ul>

<style lang="scss">
  /* Adapted from https://github.com/argyleink/gui-challenges/blob/main/media-scroller/style.css */

  :root {
    --sm-space: 2rem;
    --md-space: 5rem;
  }

  ul {
    --gap: var(--md-space);
    --thumb-color: var(--acm-dark);
    --shadow-color: var(--acm-blue);

    display: grid;
    grid-auto-flow: column;
    gap: calc(var(--gap) / 2);
    margin: 0;

    padding-inline-start: var(--gap);
    padding-inline-end: var(--gap);
    padding-block-start: calc(var(--gap) / 2);
    padding-block-end: calc(var(--gap) / 2);

    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scroll-snap-type: inline mandatory;
    scroll-padding-left: var(--sm-space);
    scroll-padding-right: var(--sm-space);
    scroll-padding-inline: var(--sm-space);

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px var(--shadow-color);
      border-radius: 10px;
      background-color: var(--acm-light);
    }

    &::-webkit-scrollbar {
      width: 12px;
      background-color: var(--acm-light);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--thumb-color);
    }

    li {
      display: flex;
      justify-content: space-evenly;
      scroll-snap-align: start;
      scroll-snap-stop: always;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ul {
      scroll-behavior: smooth;
    }
  }
</style>
