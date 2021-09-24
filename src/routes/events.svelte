<script lang="ts">
  import { onMount } from "svelte";
  import type { AcmEvent } from "../lib/parse-ical-data";
  import CommonHero from "@/components/sections/common-hero.svelte";
  import Spacing from "@/components/sections/spacing.svelte";
  import EventCarousel from "@/components/events/event-carousel.svelte";
  import AcmEmpty from "@/components/utils/acm-empty.svelte";

  let events: AcmEvent[] = [];
  let isLoading = true;

  onMount(() => {
    // Lazily load the iCal data for the event carousel.
    fetch("../events.json")
      .then((response) => response.json())
      .then((icalData) => {
        events = icalData as AcmEvent[];
        isLoading = false;
      });
  });
</script>

<Spacing minAmount="100px" amount="175px" maxAmount="200px" />

<CommonHero>
  <h2 slot="headline" class="size-l">Curated events for growth and success</h2>
  <p slot="text" class="size-xs">
    Our student chapter hosts a multitude of events throughout each school
    semester, consisting of workshops, info sessions, community building events,
    and much more!
    <br /><br />
    <span class="brand-med"
      >Events are open to anyone interested, regardless of major or background
      experience.</span
    >
  </p>
</CommonHero>

<Spacing minAmount="100px" amount="125px" maxAmount="125px" />

<h2 class="size-l headers">This week's events 📅</h2>

<Spacing amount="16px" />

{#if events.length > 0}
  <EventCarousel events="{events}" />
{:else}
  <AcmEmpty>
    <p slot="content">
      {#if isLoading}
        Loading…
      {:else}
        There are no events scheduled!
      {/if}
    </p>
  </AcmEmpty>
{/if}

<Spacing minAmount="8px" amount="63px" maxAmount="88px" />

<style lang="scss">
  @import "static/theme.scss";

  h2 {
    display: flex;
    justify-content: center;
  }

  p {
    text-align: center;
  }
</style>
