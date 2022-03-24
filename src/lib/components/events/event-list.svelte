<script lang="ts">
  import EventItem from './event-item.svelte';
  import type { AcmEvent } from '$lib/ical';

  export let events: AcmEvent[] = [];
</script>

<section>
  <div class="event-list-container">
    {#each events as eventInfo}
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
