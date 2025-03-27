<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import Block from '$lib/components/block/block.svelte';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import EmptyContainer from './empty-container.svelte';
  import EventList from './list.svelte';

  export let data: PageData;

  let calendarContainer: HTMLDivElement | null = null;

  onMount(async () => {
    if (!calendarContainer) return;
    
    const { Calendar } = await import('@fullcalendar/core');
    const dayGridPlugin = (await import('@fullcalendar/daygrid')).default;

    // sample data
    let data = {
    events: [
      { title: "Hackathon", start_date: "2025-04-10", end_date: "2025-04-11" },
      { title: "Workshop", start_date: "2025-04-15" }
    ]
  };
    
    // Calendar
    const calendar = new Calendar(calendarContainer, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      locale: 'en',
      editable: false,
      events: data.events.map(event => ({
        title: event.title,
        start: event.start_date, 
        end: event.end_date,
      })),
      eventClick: (info) => {
        alert(`Event: ${info.event.title}`);
      }
    });

    calendar.render();
  });
</script>

<svelte:head>
  <title>Events | ACM at CSUF</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fullcalendar/core/main.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid/main.min.css">
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<Block>
  <h2 slot="headline" class="size-lg">Curated events for growth and success</h2>
  <p slot="text" class="size-md">
    Our student chapter hosts a multitude of events throughout each school semester, consisting of
    workshops, info sessions, community building events, and much more!
    <br /><br />
    <span class="acm-heavy"
      >Events are open to anyone interested, regardless of major or background experience.</span
    >
  </p>
</Block>

<Spacing --min="100px" --med="175px" --max="200px" />

<div class="main-header">
  <h2 class="size-lg acm-heavier">Upcoming Events</h2>
  <img src="assets/bluecalendar.svg" alt="Blue Calendar" />
</div>

<Spacing --med="16px" />

{#if data.events.length > 0}
  <EventList events={data.events} />
  
  <!-- Add a Calendar View -->
  <div bind:this={calendarContainer} class="calendar-container"></div>
{:else}
  <EmptyContainer>
    <p slot="content">There are no events scheduled!</p>
  </EmptyContainer>
{/if}

<Spacing --min="8px" --med="63px" --max="88px" />

<style lang="scss">
  .main-header {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    flex-direction: row;

    img {
      display: block;
      margin-left: 10px;
      width: 30px;
      height: 30px;
    }
  }

  .calendar-container {
    margin-top: 20px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  p {
    text-align: center;
  }

  @media (max-width: 300px) {
    .main-header {
      img {
        display: none;
      }
    }
  }
</style>