<script lang="ts">
  import type { SvelteComponentTyped } from 'svelte';
  import { onMount } from 'svelte';
  import { Time } from '$lib/constants/time';
  import { rovingIndex } from '../../utils/roving-ux';

  // customize which element is focused
  export let focusableSelector = 'li';

  // pass array of ambiguously-structured data to carousel
  export let data: unknown[] = [];

  // pass a typed card component to carousel (https://stackoverflow.com/a/67737182)
  export let card: new (...args: any[]) => SvelteComponentTyped<{ info: unknown }>;

  // use a more appropriate variable name
  const CardComponent = card;

  const scrollIncrementDistance = 200;
  let carouselRef: HTMLDivElement;
  let carouselButtonLeft: HTMLDivElement;
  let carouselButtonRight: HTMLDivElement;
  let isGrabbing = false;
  let hasHorizontalScrollbar = false;
  let leftButtonEnabled = false;
  let rightButtonEnabled = false;
  let scrollTimeId = undefined;

  const debounceTheScroll = (callback: () => void, wait: number) => {
    callback();
    if (scrollTimeId !== undefined) {
      clearTimeout(scrollTimeId);
    }
    scrollTimeId = setTimeout(callback, wait);
  };

  const scrollTheCarousel = (movementScalar: number, isSmooth = false) => {
    carouselRef.scrollBy({
      left: -movementScalar,
      behavior: isSmooth ? 'smooth' : 'auto',
    });

    debounceTheScroll(() => {
      const canScrollLeft = carouselRef.scrollLeft > 0;
      const canScrollRight =
        carouselRef.scrollWidth - carouselRef.scrollLeft - carouselRef.clientWidth > 1;
      leftButtonEnabled = canScrollLeft;
      rightButtonEnabled = canScrollRight;
    }, Time.Second * 0.75);
  };

  const scrollOnMouseMove = (event: MouseEvent) => isGrabbing && scrollTheCarousel(event.movementX);
  const startGrabbing = () => (isGrabbing = true);
  const endGrabbing = () => (isGrabbing = false);
  const scrollLeft = () => scrollTheCarousel(scrollIncrementDistance, true);
  const scrollRight = () => scrollTheCarousel(-scrollIncrementDistance, true);
  const scrollHorizontally = (event: WheelEvent) => {
    event.preventDefault();
    scrollTheCarousel(-event.deltaY);
  };

  onMount(() => {
    hasHorizontalScrollbar = carouselRef.scrollWidth > carouselRef.clientWidth;
    rightButtonEnabled = hasHorizontalScrollbar;
  });
</script>

<section>
  <div class="carousel-container">
    <div
      bind:this={carouselButtonLeft}
      class:enabled={leftButtonEnabled}
      class="carousel-button left"
      on:click={scrollLeft}>
      &lt;
    </div>

    <ul
      use:rovingIndex={focusableSelector}
      class="card-list"
      class:grabbing={isGrabbing}
      bind:this={carouselRef}
      on:mousemove={scrollOnMouseMove}
      on:mousedown={startGrabbing}
      on:mouseup={endGrabbing}
      on:mouseleave={endGrabbing}
      on:wheel={scrollHorizontally}>
      <!-- <li class="item-buffer" /> -->

      {#each data as item (JSON.stringify(item))}
        <li>
          <CardComponent info={item} />
        </li>
      {/each}

      <!-- <li class="item-buffer" /> -->
    </ul>

    <div
      bind:this={carouselButtonRight}
      class="carousel-button right"
      on:click={scrollRight}
      class:enabled={rightButtonEnabled}>
      &gt;
    </div>
  </div>
</section>

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

    .item-buffer {
      width: 25px;
    }

    li {
      display: flex;
      justify-content: space-evenly;
      scroll-snap-align: start;
      scroll-snap-stop: always;
    }
  }

  section {
    display: flex;
    justify-content: center;
    margin-left: 0px;
  }

  .grabbing {
    cursor: grabbing !important;
  }

  .card-list {
    display: flex;
    overflow-x: hidden;
    margin-left: -75px;
    padding: 0 96px;
    cursor: grab;
    -ms-overflow-style: none; /* Hide scrollbar IE and Edge */
    scrollbar-width: none; /* Hide scrollbar Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .card-list::-webkit-scrollbar {
    display: none;
  }

  .carousel-container {
    position: relative;
    display: flex;
    width: 1168px;
  }

  .carousel-container::after,
  .carousel-container::before {
    z-index: 10;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 170px;
  }

  .carousel-container::after {
    right: 0;
    margin-right: -75px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, var(--acm-light) 20%);
  }

  .carousel-container::before {
    left: 0;
    margin-left: -75px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, var(--acm-light) 20%);
  }

  .carousel-button {
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--acm-light);
    color: var(--acm-dar);
    box-shadow: 0 3px 12px rgba(16, 19, 21, 0.2);
    width: 50px;
    height: 50px;
    border-radius: 50px;
    position: absolute;
    font-size: var(--subheading-font-size);
    top: 43%;
    transition: all 0.25s ease-in-out;
    /* Diable user select */
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    opacity: 0;
    visibility: hidden;
  }

  .carousel-button:hover {
    cursor: pointer;
    background-color: var(--acm-blue);
    color: var(--acm-light);
    box-shadow: 0 3px 12px rgba(44, 145, 198, 0.5);
  }

  .carousel-button.left {
    left: 0;
  }

  .carousel-button.right {
    right: 0;
  }

  .enabled {
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 1219px) {
    .carousel-container {
      width: 980px;
    }
  }

  @media (max-width: 1019px) {
    .carousel-container {
      width: 750px;
    }
  }

  @media (max-width: 799px) {
    .carousel-container {
      width: 600px;
    }
  }

  @media (max-width: 649px) {
    .carousel-container {
      width: 435px;
    }
  }

  @media (max-width: 480px) {
    .carousel-button.left {
      left: 50px;
    }

    .carousel-button.right {
      right: 50px;
    }
  }

  @media (max-width: 360px) {
    .carousel-button.left {
      left: 70px;
    }

    .carousel-button.right {
      right: 70px;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ul {
      scroll-behavior: smooth;
    }
  }
</style>
