<script context="module" lang="ts">
  export async function load({ fetch }) {
    const response = await fetch('../events.json');
    const events: AcmEvent[] = await response.json();
    return { props: { events } };
  }
</script>

<script lang="ts">
  import type { AcmEvent } from '$lib/ical/parse';
  import CommonHero from '$lib/components/sections/common-hero.svelte';
  import Spacing from '$lib/components/sections/spacing.svelte';
  import AcmCarousel from '$lib/components/utils/acm-carousel.svelte';
  import EventCard from '$lib/components/events/event-card.svelte';
  import AcmEmpty from '$lib/components/utils/acm-empty.svelte';

  export let events: AcmEvent[] = [];
</script>

<Spacing --min="100px" --med="175px" --max="200px" />

<CommonHero>
  <h2 slot="headline" class="size-l">Curated events for growth and success</h2>
  <p slot="text" class="size-xs">
    Our student chapter hosts a multitude of events throughout each school semester, consisting of
    workshops, info sessions, community building events, and much more!
    <br /><br />
    <span class="brand-med"
      >Events are open to anyone interested, regardless of major or background experience.</span>
  </p>
</CommonHero>

<Spacing --min="100px" --med="125px" --max="125px" />

<h2 class="size-l headers">This week's events 📅</h2>

<Spacing --min="16px" --med="16px" --max="16px" />

{#if events.length > 0}
  <div class="carousel-container">
    <AcmCarousel data={events} card={EventCard} />
  </div>
{:else}
  <AcmEmpty>
    <p slot="content">There are no events scheduled!</p>
  </AcmEmpty>
{/if}

<Spacing />

<style lang="scss">
  @import 'static/theme.scss';

  h2 {
    display: flex;
    justify-content: center;
  }

  p {
    text-align: center;
  }

  .carousel-container {
    margin: 0 auto;
    max-width: 800px;
  }
</style>
