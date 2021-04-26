<script lang="ts">
  import { onMount } from "svelte";
  import EventItem from "./event-item.svelte";
  import type { AcmEvent } from "../../lib/parse-ical-data";

  export let events: AcmEvent[] = [];

  let carouselRef: HTMLDivElement;
  let isGrabbing = false;
  const scrollSpeed = 2;

  const scrollTheCarousel = (movementScalar: number) => {
    carouselRef.scrollBy({
      left: -movementScalar * scrollSpeed,
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
    return () => {
      carouselRef.removeEventListener("mousemove", scrollOnMouseMove);
      carouselRef.removeEventListener("mousedown", startGrabbing);
      carouselRef.removeEventListener("mouseup", endGrabbing);
    };
  });
</script>

<section>
  <h2>this week's events</h2>
  <div bind:this="{carouselRef}" class:grabbing="{isGrabbing}">
    {#each events as eventInfo}
      <EventItem info="{eventInfo}" />
    {/each}
  </div>
</section>

<style>
  section {
    margin: auto;
    max-width: 800px;
  }

  section h2 {
    font-size: var(--subheading-font-size);
    margin-bottom: 40px;
  }

  section .grabbing {
    cursor: grabbing;
  }

  section div {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    padding-bottom: 32px;
    cursor: grab;
  }
</style>
