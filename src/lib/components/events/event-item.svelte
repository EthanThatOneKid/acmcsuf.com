<script lang="ts">
  import { onMount } from 'svelte';
  import type { AcmEvent } from '$lib/ical/parse';

  export let info: AcmEvent;

  let isRecurring: boolean = info.recurring;
  let anchor: HTMLElement;
  let details: HTMLDetailsElement;

  onMount(() => {
    if (location.hash === `#${info.slug}`) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      });
      // This has the same styling as :target, and :target doesn't want to work
      // for dynamically-added elements.
      details.open = true;
    }
  });
</script>

<div class="event-box" style={`--highlights: var(--${info.acmPath.slug}-rgb)`}>
  <!-- Workaround for the top panel covering the event card's anchor. -->
  <div class="anchor" id={info.slug} bind:this={anchor} />
  <details class="event-card" bind:this={details}>
    <summary class="event-body">
      <div class="event-name">
        <h2 class="headers">
          {info.summary}
        </h2>
        <p class="event-location">
          {info.location === 'Discord' || info.location === 'Zoom'
            ? `Hosted on ${info.location}`
            : info.location}
        </p>
      </div>
      <p class="event-date">
        <!-- TODO: RFC3339 timestamp for datetime -->
        <time>
          {info.month}
          {info.day} at {info.time}
          {#if isRecurring}(recurring){/if}
        </time>
      </p>
      <a
        class="event-join size-s"
        href={info.meetingLink}
        role="button"
        target="_blank"
        rel="noopener noreferrer">Join</a>
    </summary>
    <hr />
    <p class="event-description">
      {@html info.description}
    </p>
  </details>
</div>

<style lang="scss">
  @import 'static/theme.scss';

  :root {
    --general-rgb: 44, 145, 198;
    --algo-rgb: 157, 53, 231;
    --create-rgb: 255, 67, 101;
    --dev-rgb: 30, 108, 255;
  }

  .event-box {
    position: relative;
  }

  .event-box > .anchor {
    visibility: hidden;
    position: absolute;
    /* 200px from the top of the screen for the anchor workaround. */
    top: -200px;
  }

  .event-card {
    margin: 32px 64px;
    padding: 0;
    box-shadow: 0 6px 18px rgba(var(--highlights, --general-rgb), 0.25);
    transition: all 0.15s ease-in-out;
    border-radius: 30px;
    border: 2px solid var(--acm-dark);
  }

  .event-card:hover {
    box-shadow: 0 6px 18px rgba(var(--highlights, --general-rgb), 0.65);
  }

  .event-card[open] {
    box-shadow: 0 6px 24px rgba(var(--highlights, --general-rgb), 0.75);
    border: 2px solid rgb(var(--highlights, --general-rgb));
  }

  .event-card:hover h2,
  .event-card[open] h2 {
    color: rgb(var(--highlights, --general-rgb));
  }

  .event-box > .anchor:target + .event-card {
    box-shadow: 0 6px 24px rgba(var(--highlights, --general-rgb), 0.75);
    border: 2px solid rgb(var(--highlights, --general-rgb));
  }

  .event-card hr {
    border-width: 1px;
    border-color: var(--acm-dark);
    background-color: var(--acm-dark);
    opacity: 0.5;
    margin: 24px 0;
  }

  .event-card > hr,
  .event-description {
    margin: 0 30px;
  }

  .event-body {
    /* Do this whole dance so the user can click on the padding. */
    padding: 24px 30px;
    cursor: pointer;
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  /* Safari workaround for list-style: none. */
  summary.event-body::-webkit-details-marker {
    display: none;
  }

  .event-body .event-name {
    transition: all 0.15s ease-in-out;
  }

  .event-body:hover .event-name {
    color: rgb(var(--highlights, --general-rgb));
  }

  .event-body h2 {
    position: relative;
    user-select: none;
    color: var(--acm-dark);
    transition: all 0.15s ease-in-out;
  }

  .event-date {
    flex: 0;
    user-select: none;
    text-align: right;
    white-space: nowrap;
  }

  .event-name {
    flex: 1;
    text-align: left;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .event-name,
  .event-date {
    margin-right: 16px;
  }

  .event-name h2 {
    line-height: 1.2em;
  }

  .event-location:not(:empty) {
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* Required for ellipsizing. */
    max-width: 300px;
  }

  .event-join {
    margin: 0;
    padding: 12px 24px;
    text-decoration: none;
    text-align: center;
    border-radius: 12px;
    background-color: var(--acm-dark);
    color: var(--acm-light);
    transition: background-color 0.25s ease-in-out;
  }

  .event-description {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .event-description:empty::after {
    content: 'No description.';
    opacity: 0.75;
    font-style: italic;
  }

  @media (max-width: 799px) {
    .event-body {
      flex-direction: column;
    }

    .event-name {
      text-align: center;
      margin-right: 0;
      align-items: center;
    }

    .event-date {
      margin-top: 10px;
      margin-bottom: 12px;
      margin-right: 0;
    }
  }
</style>
