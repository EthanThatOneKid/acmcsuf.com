<script lang="ts">
  import { onMount } from "svelte";
  import type { AcmEvent } from "../lib/parse-ical-data";
  import CommonHero from "@/components/sections/common-hero.svelte";
  import Spacing from "@/components/sections/spacing.svelte";
  import EventCarousel from "@/components/events/event-carousel.svelte";
  import CallToActionSection from "@/components/sections/call-to-action-section.svelte";
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

<CommonHero src="../assets/png/acm-csuf-badge.png" alt="acm-CSUF-Logo">
  <h1 slot="title">Events</h1>
  <h2 slot="headline">All you need to know!</h2>
  <p slot="text">
    Events listed below are either hosted by <span class="brand-em"
      >acm<span class="brand-blue">CSUF</span></span
    >, <span class="brand-em">acm<span class="brand-purple">Algo</span></span>,
    <span class="brand-em">acm<span class="brand-pink">Create</span></span>,
    <span class="brand-em">acm<span class="brand-bluer">Dev</span></span>, or in
    collaboration with other organizations. Unless specified, everyone is free
    to join any of our events! It doesn't matter what major you are; as long as
    you have an interest in tech, you're absolutely welcome to join us!
  </p>
</CommonHero>

<Spacing />

{#if events.length > 0}
  <EventCarousel events="{events}" />
{:else}
  <AcmEmpty>
    <p slot="content">
      {#if isLoading}
        Loading…
      {:else}
        There are currently no events scheduled.
      {/if}
    </p>
  </AcmEmpty>
{/if}

<Spacing />

<CallToActionSection>
  <h2 slot="headline">So what are you waiting for?</h2>
  <p slot="text">
    We invite you to become a part of our chapter consisting of
    <b>350<span class="brand-blue">+</span> members</b>, and rising! All of our
    coding workshops, info sessions, and community events were designed to start
    off your tech journey on the right foot.
  </p>
</CallToActionSection>

<Spacing amount="175px" />
