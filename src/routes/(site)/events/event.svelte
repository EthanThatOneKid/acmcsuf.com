<script lang="ts">
  import { onMount } from 'svelte';
  import type { ClubEvent } from '$lib/public/events/event';
  import EventSummary from './event-summary.svelte';

  export let info: ClubEvent;

  let isRecurring: boolean = info.recurring;
  let anchor: HTMLElement;
  let details: HTMLDetailsElement;
  let shown = false;

  function formatLocation(location?: string | null, hosted = ['Discord', 'Zoom']): string {
    // '', null, and undefined are all TBD
    location = location?.trim() ?? '';
    if (location === '') {
      return 'TBD';
    }

    return hosted.includes(location) ? `Hosted on ${location}` : location;
  }

  onMount(() => {
    if (location.hash === `#${info.id}`) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      });

      // This has the same styling as :target, and :target doesn't want to work
      // for dynamically-added elements.
      shown = true;
    }
    details.open = true;
  });
</script>

<div
  class="event-box"
  style:--highlights={`var(--acm-${info.team}-rgb)`}
  on:click|preventDefault|stopPropagation={() => (shown = !shown)}
  on:keypress|preventDefault|stopPropagation={() => (shown = !shown)}
  role="button"
  tabindex="0"
>
  <!-- Workaround for the top panel covering the event card's anchor. -->
  <div class="anchor" id={info.id} bind:this={anchor} />
  <details class="event-card" bind:this={details} class:highlighted={shown} role="region">
    <summary class="event-body">
      <div class="event-name">
        <h2 class="acm-heavier">
          {info.title}
        </h2>

        <p class="event-location">
          {formatLocation(info.location)}
        </p>
      </div>

      <p class="event-date">
        <!-- TODO: RFC3339 timestamp for datetime -->
        <time>
          {info.month}
          {info.day} at {info.startTime} - {info.endTime}
          {#if isRecurring}(recurring){/if}
        </time>
      </p>

      <a
        class="event-join size-sm"
        href={info.meetingLink}
        role="button"
        target="_blank"
        rel="noopener noreferrer"
        on:click={(/* janky hack */) => {
          shown = !shown;
        }}>Join</a
      >
    </summary>

    <noscript>
      <EventSummary {info} />
    </noscript>

    {#if shown}
      <EventSummary {info} />
    {/if}
  </details>
</div>

<style lang="scss">
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
    box-shadow: 0 6px 18px rgba(var(--highlights, --acm-general-rgb), 0.25);
    transition: all 0.15s ease-in-out;
    border-radius: 30px;
    border: 2px solid var(--acm-dark);
  }

  .event-card:hover {
    box-shadow: 0 6px 18px rgba(var(--highlights, --acm-general-rgb), 0.65);
  }

  .highlighted {
    box-shadow: 0 6px 24px rgba(var(--highlights, --acm-general-rgb), 0.75);
    border: 2px solid rgb(var(--highlights, --acm-general-rgb));
  }

  .event-card[open] {
    border: 2px solid rgb(var(--highlights, --acm-general-rgb));
  }

  .event-card:hover h2,
  .event-card[open] h2 {
    color: rgb(var(--highlights, --acm-general-rgb));
  }

  .event-box > .anchor:target + .event-card {
    box-shadow: 0 6px 24px rgba(var(--highlights, --acm-general-rgb), 0.75);
    border: 2px solid rgb(var(--highlights, --acm-general-rgb));
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

  .event-body:hover {
    .event-name {
      color: rgb(var(--highlights, --acm-general-rgb));
    }

    .event-join:hover {
      color: rgb(var(--highlights, --acm-general-rgb));
    }
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
