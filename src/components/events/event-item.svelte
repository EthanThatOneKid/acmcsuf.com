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

<div class="event-box">
  <div class="anchor" id="{info.slug}"></div>
  <div class="event-card">
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
</div>

<style>
  .event-box {
    display: flex;
    position: relative;
  }

  .event-box > .anchor {
    visibility: hidden;
    position: absolute;
    top: -200px;
  }

  .event-box > .anchor:target + .event-card {
    border: 2px solid #ff003388;
    box-shadow: 0px 12px 18px #ff003388;
  }

  .event-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 320px;
    min-width: 180px;
    margin: 0 15px;
    padding: 20px;
    box-shadow: 0px 12px 18px rgba(55, 146, 193, 0.5);
    border-radius: 25px;
  }

  .event-card > div.anchor {
    visibility: hidden;
    position: absolute;
    top: -200px;
  }

  .event-card h3 {
    position: relative;
    font-size: calc(var(--subheading-font-size) * 0.75);
    line-height: var(--subheading-font-size);
    margin: 10px 0;
    text-align: center;
    user-select: none;
  }

  .event-card h3:hover {
    cursor: pointer;
  }

  .event-card h3:hover {
    color: var(--acm-blue);
    text-decoration: underline;
  }

  .event-card .copied::before {
    content: "Copied!";
    position: absolute;
    width: 100%;
    border-radius: 10px;
    background-color: var(--acm-dark);
    color: var(--acm-light);
    padding: 0.25rem;
    top: -0.5rem;
    left: 50%;
    transform: translate(-50%, -100%);
    opacity: 0.95;
    font-size: var(--body-font-size);
  }

  .event-card p {
    font-size: calc(var(--body-font-size) * 0.75);
    text-align: center;
    user-select: none;
  }
</style>
