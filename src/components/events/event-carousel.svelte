<script lang="ts">
  import EventItem from "./event-item.svelte";
  import type { AcmEvent } from "../../lib/parse-ical-data";

  export let events: AcmEvent[] = [];
</script>

<section>
  <h2>this week's events</h2>
  <div>
    {#each events as eventInfo}
      <EventItem info="{eventInfo}" />
    {/each}
  </div>
</section>

<style>
  section {
    margin: auto;
    max-width: 800px;
  }

  section h2 {
    font-size: var(--subheading-font-size);
    margin-bottom: 40px;
  }

  section div {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    padding-bottom: 60px;
  }
</style>
