<script lang="ts">
  import type { ClubEvent } from '$lib/public/events/event';
  import EventItem from './event.svelte';

  export let events: ClubEvent[] = [];
</script>

<section>
  <div class="event-list-container">
    {#each events as eventInfo (eventInfo.id)}
      <EventItem info={eventInfo} />
    {/each}
  </div>
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    margin-left: 0px;
  }

  .event-list-container {
    width: clamp(435px, 95%, 980px);
  }
</style>
