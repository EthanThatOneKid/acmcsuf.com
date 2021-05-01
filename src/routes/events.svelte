<script lang="ts" context="module">
  import { parseIcalData } from "../lib/parse-ical-data";
  const ICAL_TARGET_URL =
    "https://calendar.google.com/calendar/ical/738lnit63cr2lhp7jtduvj0c9g%40group.calendar.google.com/public/basic.ics";

  export async function preload() {
    const response = await this.fetch(ICAL_TARGET_URL);
    const icalData = await response.text();
    return { events: parseIcalData(icalData) };
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { AcmEvent } from "../lib/parse-ical-data";
  import CommonHero from "@/components/sections/common-hero.svelte";
  import Spacing from "@/components/sections/spacing.svelte";
  import EventCarousel from "@/components/events/event-carousel.svelte";
  import CallToActionSection from "@/components/sections/call-to-action-section.svelte";

  export let events: AcmEvent[] = [];

  // onMount(() => {
  //   // If the /events route has an event's fragment
  //   // attached to the URL, the scroll needs to be
  //   // offset slightly upwards.
  //   if (location.hash.length > 0) {
  //     scrollBy({ top: -200 });
  //   }
  // });
</script>

<svelte:head>
  <script type="text/javascript" src="https://unpkg.com/ical.js"></script>
</svelte:head>

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
<EventCarousel events="{events}" />
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

<style>
</style>
