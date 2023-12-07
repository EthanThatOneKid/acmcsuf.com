<script lang="ts">
  import type { PageData } from './$types';
  import Block from '$lib/components/block/block.svelte';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import EmptyContainer from './empty-container.svelte';
  import EventList from './list.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Events | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<Block>
  <h2 slot="headline" class="size-lg">Curated events for growth and success</h2>
  <p slot="text" class="size-md">
    Our student chapter hosts a multitude of events throughout each school semester, consisting of
    workshops, info sessions, community building events, and much more!
    <br /><br />
    <span class="brand-med"
      >Events are open to anyone interested, regardless of major or background experience.</span
    >
  </p>
</Block>

<Spacing --min="100px" --med="175px" --max="200px" />

<div class="main-header">
  <h2 class="size-lg headers">Upcoming Events</h2>
  <img src="assets/bluecalendar.svg" alt="Blue Calender" />
</div>

<Spacing --med="16px" />

{#if data.events.length > 0}
  <EventList events={data.events} />
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
