<script lang="ts">
  import { onMount } from 'svelte';
  import type { AcmEvent } from '$lib/ical/parse';

  export let info: AcmEvent;

  let isRecurring: boolean = info.recurring;

  onMount(() => {
    if (location.hash === `#${info.slug}`) {
      document.getElementById(info.slug).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      });
    }
  });
</script>

<div class="event-box">
  <!-- Workaround for the top panel covering the event card's anchor. -->
  <div class="anchor" id={info.slug} />
  <div class="event-card">
    <div class="event-name">
      <h2 class="headers">
        <a href="#{info.slug}">
          {info.summary}
        </a>
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
    <a class="event-join size-s" href={info.meetingLink} role="button">Join</a>
  </div>
</div>

<style lang="scss">
  @import 'static/theme.scss';

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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 32px 64px;
    padding: 24px 30px;
    box-shadow: 0 6px 18px rgba(44, 145, 198, 0.25);
    transition: all 0.25s ease-in-out;
    border-radius: 30px;
    border: 2px solid var(--acm-dark);
  }

  .event-box > .anchor:target + .event-card {
    box-shadow: 0 6px 24px rgba(44, 145, 198, 0.75);
    border: 2px solid var(--acm-blue);
  }

  .event-card a {
    text-decoration: none;
    transition: all 0.15s ease-in-out;
  }

  .event-card a:hover {
    color: var(--acm-blue);
  }

  .event-card h2 {
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
    padding: 0;
    padding: 12px 24px;
    border-radius: 12px;
    background-color: var(--acm-dark);
    color: var(--acm-light);
    transition: background-color 0.25s ease-in-out;
  }

  @media (max-width: 799px) {
    .event-card {
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
