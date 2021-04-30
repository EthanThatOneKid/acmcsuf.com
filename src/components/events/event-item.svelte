<script lang="ts">
  import type { AcmEvent } from "../../lib/parse-ical-data";
  import { links } from "../../lib/links";
  import AcmButton from "@/components/utils/acm-button.svelte";
  export let info: AcmEvent;

  const isDiscordEvent = info.location.length === 0;
  const meetingLink = isDiscordEvent ? links.discord : info.location;
  let isSuccessfullyCopied = false;

  const copyEventLink = (slug: string) => {
    const url = [location.origin, location.pathname, "#", slug].join("");
    // Copying text to the clipboard: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
    navigator.clipboard.writeText(url).then(() => {
      isSuccessfullyCopied = true;
      setTimeout(() => (isSuccessfullyCopied = false), 2e3);
    });
  };
</script>

<div id="{info.slug}" class="event-card">
  <p class="event-date">
    <span class="brand-em">
      {info.month} <span class="brand-blue">{info.day}</span>
    </span>
  </p>
  <h3
    class:copied="{isSuccessfullyCopied}"
    on:click="{() => copyEventLink(info.slug)}"
  >
    {info.summary}
  </h3>
  <div>
    <p class="event-time">Starts at {info.time}</p>
    <p class="event-location">
      Hosted on {isDiscordEvent ? "Discord" : "Zoom"}
    </p>
    <AcmButton link="{meetingLink}" text="Click here to join!" />
  </div>
</div>

<style>
  .event-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 320px;
    min-width: 320px;
    margin: 0 15px;
    padding: 20px;
    box-shadow: 0px 12px 18px rgba(55, 146, 193, 0.5);
    border-radius: 25px;
  }

  .event-card h3 {
    font-size: calc(var(--subheading-font-size) * 0.75);
    line-height: var(--subheading-font-size);
    margin: 10px 0;
    text-align: center;
    user-select: none;
  }

  .event-card h3:hover {
    cursor: pointer;
  }

  .event-card h3:hover::before {
    content: "🔗";
  }

  .event-card .copied::before {
    content: "✔" !important; /* This checkmark should take priority if .copied */
  }

  .event-card p {
    font-size: calc(var(--body-font-size) * 0.75);
    text-align: center;
    user-select: none;
  }
</style>
