<script lang="ts">
  import { onMount } from "svelte";
  import EventItem from "./event-item.svelte";
  import type { AcmEvent } from "../../lib/parse-ical-data";

  export let events: AcmEvent[] = [];

  let carouselRef: HTMLDivElement;
  let carouselButtonLeft: HTMLDivElement;
  let carouselButtonRight: HTMLDivElement;
  let isGrabbing = false;
  const scrollSpeed = 2;

  const scrollTheCarousel = (movementScalar: number) => {
    carouselRef.scrollBy({
      left: -movementScalar * scrollSpeed,
    });
  };

  const smoothScrollCarousel = (movementScalar: number) => {
    carouselRef.scrollBy({
      left: movementScalar * scrollSpeed,
      behavior: "smooth",
    });
  };
  const scrollOnMouseMove = (event: MouseEvent) => {
      if (isGrabbing) {
        scrollTheCarousel(event.movementX);
      }
    },
    startGrabbing = () => (isGrabbing = true),
    endGrabbing = () => (isGrabbing = false);

  onMount(() => {
    carouselRef.addEventListener("mousemove", scrollOnMouseMove);
    carouselRef.addEventListener("mousedown", startGrabbing);
    carouselRef.addEventListener("mouseup", endGrabbing);
    carouselButtonLeft.addEventListener("click", () => {
      smoothScrollCarousel(-150);
    });
    carouselButtonRight.addEventListener("click", () => {
      smoothScrollCarousel(150);
    });
    return () => {
      carouselRef.removeEventListener("mousemove", scrollOnMouseMove);
      carouselRef.removeEventListener("mousedown", startGrabbing);
      carouselRef.removeEventListener("mouseup", endGrabbing);
    };
  });
</script>

<section>
  <h2>this week's events</h2>
  <div id="EventCarouselContainer">
    <div
      bind:this="{carouselButtonLeft}"
      id="CarouselButtonLeft"
      class="carousel-button"
    >
      &lt;
    </div>
    <div
      id="EventCarousel"
      bind:this="{carouselRef}"
      class:grabbing="{isGrabbing}"
    >
      <div class="event-item-buffer"></div>
      {#each events as eventInfo}
        <EventItem info="{eventInfo}" />
      {/each}
      <div class="event-item-buffer"></div>
    </div>
    <div
      bind:this="{carouselButtonRight}"
      id="CarouselButtonRight"
      class="carousel-button"
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
    font-size: var(--subheading-font-size);
    margin: 0 150px 40px;
  }

  section .grabbing {
    cursor: grabbing;
  }

  section #EventCarousel {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    padding-bottom: 32px;
    cursor: grab;
    -ms-overflow-style: none; /* Hide scrollbar IE and Edge */
    scrollbar-width: none; /* Hide scrollbar Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  section #EventCarousel::-webkit-scrollbar {
    display: none;
  }

  .event-item-buffer {
    min-width: 175px;
  }

  #EventCarouselContainer {
    position: relative;
    display: flex;
    flex-direction: row;
  }
  #EventCarouselContainer::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    min-width: 175px;
    background: linear-gradient(to right, transparent 0%, White 25%);
  }

  #EventCarouselContainer::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    min-width: 175px;
    background: linear-gradient(to left, transparent 0%, White 25%);
  }

  .carousel-button {
    z-index: 2;
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

  #CarouselButtonLeft {
    left: 100px;
  }
  #CarouselButtonRight {
    right: 100px;
  }

  @media screen and (max-width: 768px) {
    .event-item-buffer {
      min-width: 100px;
    }
    #EventCarouselContainer::after,
    #EventCarouselContainer::before {
      min-width: 100px;
    }

    .carousel-button {
      display: none;
    }
    #CarouselButtonLeft {
      left: 50px;
    }
    #CarouselButtonRight {
      right: 50px;
    }
  }
</style>
