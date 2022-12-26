<script lang="ts">
  import { copy } from '$lib/public/copy/copy';
  import type { ClubEvent } from '$lib/public/events/event';
  import { slide } from 'svelte/transition';
  import BwIcon from '$lib/components/bw-icon/bw-icon.svelte';

  export let info: ClubEvent;
</script>

<div transition:slide>
  <hr />
  <p class="event-description">
    {@html info.description}
  </p>

  <div class="event-actionbar">
    <button
      class="action-item"
      title="Copy event link"
      on:click={() =>
        copy(
          info.selfLink,
          'Copied event link to clipboard!',
          'Failed to copy event link to clipboard!',
          info.team.id
        )}
    >
      <BwIcon src="/assets/svg/copy-link.svg" alt="copy link" />
    </button>
    <button
      class="action-item"
      title="Copy event summary"
      on:click={() =>
        copy(
          info.summary,
          'Copied event summary to clipboard!',
          'Failed to copy event summary to clipboard!',
          info.team.id
        )}
    >
      <BwIcon src="/assets/svg/copy-text.svg" alt="Copy event summary" />
    </button>
    <button
      class="action-item"
      title="Copy Google Calendar link"
      on:click={() =>
        copy(
          info.calendarLinks.google,
          'Copied Google Calendar link to clipboard!',
          'Failed to copy Google Calendar link to clipboard!',
          info.team.id
        )}
    >
      <BwIcon src="/assets/svg/calendar-google.svg" alt="Copy Google Calendar link" />
    </button>
    <button
      class="action-item"
      title="Copy Microsoft Outlook calendar link"
      on:click={() =>
        copy(
          info.calendarLinks.outlook,
          'Copied Microsoft Outlook calendar link to clipboard!',
          'Failed to copy Microsoft Outlook calendar link to clipboard!',
          info.team.id
        )}
    >
      <BwIcon src="/assets/svg/calendar-outlook.svg" alt="Copy Outlook Calendar link" />
    </button>
  </div>
</div>

<style lang="scss">
  .event-description {
    margin: 0 30px;
    overflow-wrap: break-word;
  }

  .event-description:empty::after {
    content: 'No description.';
    opacity: 0.75;
    font-style: italic;
  }

  .event-actionbar {
    display: flex;
    flex-direction: row-reverse;
    padding: 0 2em 2em 2em;
    gap: 1em;

    .action-item {
      --size: 40px;

      color: var(--highlights);
      width: var(--size);
      height: var(--size);
      padding: calc(var(--size) * 0.15);
      box-shadow: 0 6px 18px rgba(var(--highlights, --acm-general-rgb), 0.25);
      transition: all 0.25s ease-in-out;
      border-radius: 30px;
      border: 2px solid var(--acm-dark);
      background-color: var(--acm-light);
    }

    .action-item:hover {
      box-shadow: 0 6px 18px rgba(var(--highlights, --acm-general-rgb), 0.66);
    }
  }

  hr {
    border-width: 1px;
    border-color: var(--acm-dark);
    background-color: var(--acm-dark);
    opacity: 0.5;
    margin: 0 24px 30px 24px;
  }
</style>
