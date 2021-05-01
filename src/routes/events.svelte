<script lang="ts">
  import { onMount } from "svelte";
  import type { AcmEvent } from "../lib/parse-ical-data";
  import CommonHero from "@/components/sections/common-hero.svelte";
  import Spacing from "@/components/sections/spacing.svelte";
  import EventCarousel from "@/components/events/event-carousel.svelte";
  import CallToActionSection from "@/components/sections/call-to-action-section.svelte";
  import AcmEmpty from "@/components/utils/acm-empty.svelte";

  let events: AcmEvent[] = [];

  onMount(() => {
    // Lazily load the ICAL data for the event carousel.
    fetch("../events.json")
      .then((response) => response.json())
      .then((icalData) => {
        console.log({ icalData });
        events = icalData as AcmEvent[];
      });
  });
</script>

<CommonHero src="../assets/png/acm-csuf-badge.png" alt="acm-CSUF-Logo">
  <h1 slot="title">events</h1>
  <h2 slot="headline">all you need to know!</h2>
  <p slot="text">
    Events are hosted either by the entirety of <span class="brand-em"
      >acm<span class="brand-blue">CSUF</span></span
    >, by our paths, or in collaboration with other organizations. Unless
    specified, everyone is free to join any of our events! It doesn’t matter
    what major you are; as long as you have an interest in tech, you’re
    absolutely welcome to join us for the ride.
  </p>
</CommonHero>

<Spacing />

{#if events.length === 0}
  <AcmEmpty>
    <p slot="content">There are currently no events scheduled.</p>
  </AcmEmpty>
{:else}
  <EventCarousel events="{events}" />
{/if}

<Spacing />

<CallToActionSection>
  <h2 slot="headline">so what are you waiting for?</h2>
  <p slot="text">
    We invite you to come out to our events, and see what our chapter has in
    store! All of our coding workshops, info sessions, and community events were
    designed to start off your tech journey on the right foot.
  </p>
</CallToActionSection>

<Spacing amount="175px" />
