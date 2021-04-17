<script lang="ts" context="module">
  import { parseIcalData } from "../lib/parse-ical-data";
  const ICAL_TARGET_URL =
    "https://calendar.google.com/calendar/ical/738lnit63cr2lhp7jtduvj0c9g%40group.calendar.google.com/public/basic.ics";

  export async function preload() {
    const response = await this.fetch(ICAL_TARGET_URL);
    const icalData = await response.text();
    return { events: JSON.stringify(parseIcalData(icalData), null, 2) };
  }
</script>

<script lang="ts">
  export let events: string;
</script>

<svelte:head>
  <script type="text/javascript" src="https://unpkg.com/ical.js"></script>
</svelte:head>

<pre><code>{events}</code></pre>

<!-- <ComingSoon title="events" src="../assets/badges/PNG/acm-csuf-badge.png" /> -->
