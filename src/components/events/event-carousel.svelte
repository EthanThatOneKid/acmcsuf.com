<script lang="ts">
  import EventItem from "./event-item.svelte";
  import type { AcmEvent } from "../../lib/parse-ical-data";

  export let events: AcmEvent[] = [];

  const scrollIncrementDistance = 250;
  let carouselRef: HTMLDivElement;
  let carouselButtonLeft: HTMLDivElement;
  let carouselButtonRight: HTMLDivElement;
  let isGrabbing = false;

  const scrollTheCarousel = (
      movementScalar: number,
      isSmooth: boolean = false
    ) =>
      carouselRef.scrollBy({
        left: -movementScalar,
        behavior: isSmooth ? "smooth" : "auto",
      }),
    scrollOnMouseMove = (event: MouseEvent) =>
      isGrabbing && scrollTheCarousel(event.movementX),
    startGrabbing = () => (isGrabbing = true),
    endGrabbing = () => (isGrabbing = false),
    scrollLeft = () => scrollTheCarousel(scrollIncrementDistance, true),
    scrollRight = () => scrollTheCarousel(-scrollIncrementDistance, true),
    scrollHorizontally = (event: WheelEvent) => {
      event.preventDefault();
      scrollTheCarousel(-event.deltaY);
    };
</script>

<section>
  <h2>Upcoming events</h2>
  <div class="event-carousel-container">
    <div
      bind:this="{carouselButtonLeft}"
      class="carousel-button left"
      on:click="{scrollLeft}"
    >
      &lt;
    </div>
    <div
      class="event-list"
      bind:this="{carouselRef}"
      class:grabbing="{isGrabbing}"
      on:mousemove="{scrollOnMouseMove}"
      on:mousedown="{startGrabbing}"
      on:mouseup="{endGrabbing}"
      on:wheel="{scrollHorizontally}"
    >
      <div class="event-item-buffer"></div>
      {#each events as eventInfo}
        <EventItem info="{eventInfo}" />
      {/each}
      <div class="event-item-buffer"></div>
    </div>
    <div
      bind:this="{carouselButtonRight}"
      class="carousel-button right"
      on:click="{scrollRight}"
    >
      &gt;
    </div>
  </div>
</section>

<style>
  section {
    margin: 0;
  }

  section h2 {
    text-transform: lowercase;
    font-size: var(--subheading-font-size);
    margin: 0 150px 40px;
  }

  section .grabbing {
    cursor: grabbing !important;
  }

  section .event-list {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 32px;
    cursor: grab;
    -ms-overflow-style: none; /* Hide scrollbar IE and Edge */
    scrollbar-width: none; /* Hide scrollbar Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  section .event-list::-webkit-scrollbar {
    display: none;
  }

  .event-item-buffer {
    min-width: 175px;
  }

  .event-carousel-container {
    position: relative;
    display: flex;
    flex-direction: row;
  }

  .event-carousel-container::after,
  .event-carousel-container::before {
    z-index: 10;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    min-width: 175px;
  }

  .event-carousel-container::after {
    right: 0;
    background: linear-gradient(to right, transparent 0%, var(--acm-light) 25%);
  }

  .event-carousel-container::before {
    left: 0;
    background: linear-gradient(to left, transparent 0%, var(--acm-light) 25%);
  }

  .carousel-button {
    z-index: 20;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 0px 6px 9px rgba(33, 33, 33, 0.2);
    min-width: 50px;
    min-height: 50px;
    border-radius: 50px;
    position: absolute;
    font-size: var(--subheading-font-size);
    top: 40%;

    /* Diable user select */
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .carousel-button:hover {
    cursor: pointer;
    box-shadow: 0px 6px 9px rgba(55, 146, 193, 0.5);
  }

  .carousel-button.left {
    left: 100px;
  }

  .carousel-button.right {
    right: 100px;
  }

  @media screen and (max-width: 768px) {
    section h2 {
      text-align: center;
    }

    .event-item-buffer {
      width: 20px;
      min-width: unset;
    }

    .event-carousel-container::after,
    .event-carousel-container::before {
      width: 20px;
      min-width: unset;
    }

    .carousel-button {
      display: none;
    }

    .carousel-button.left {
      left: 50px;
    }

    .carousel-button.right {
      right: 50px;
    }
  }
</style>
