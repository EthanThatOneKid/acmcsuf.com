<script lang="ts" context="module">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/internal';

  export async function load({ fetch }: LoadInput): Promise<LoadOutput> {
    const response = await fetch(`/events.json`);
    return { props: { events: await response.json() } };
  }
</script>

<script lang="ts">
  import type { AcmEvent } from '$lib/ical';
  import CommonHero from '$lib/components/sections/common-hero.svelte';
  import Spacing from '$lib/components/sections/spacing.svelte';
  import EventCarousel from '$lib/components/events/event-list.svelte';
  import AcmEmpty from '$lib/components/utils/acm-empty.svelte';

  export let events: AcmEvent[] = [];
</script>

<svelte:head>
  <title>Events | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<CommonHero>
  <h2 slot="headline" class="size-lg">Curated events for growth and success</h2>
  <p slot="text" class="size-xs">
    Our student chapter hosts a multitude of events throughout each school semester, consisting of
    workshops, info sessions, community building events, and much more!
    <br /><br />
    <span class="brand-med"
      >Events are open to anyone interested, regardless of major or background experience.</span
    >
  </p>
</CommonHero>

<Spacing --min="100px" --med="175px" --max="200px" />

<h2 class="size-lg headers">Upcoming Events 📅</h2>

<Spacing --med="16px" />

{#if events.length > 0}
  <EventCarousel {events} />
{:else}
  <AcmEmpty>
    <p slot="content">There are no events scheduled!</p>
  </AcmEmpty>
{/if}

<Spacing --min="8px" --med="63px" --max="88px" />

<style lang="scss">
  h2 {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  p {
    text-align: center;
  }
</style>
