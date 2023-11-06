<script lang="ts">
  import type { PageData } from './$types';
  import { MetaTags } from 'svelte-meta-tags';
  import Spacing from '$lib/public/legacy/spacing.svelte';

  export let data: PageData;
</script>

<MetaTags
  openGraph={{
    title: `LC-Dailies | O(N)ovember`,
    description:
      "Showcase of the scores of the players in the acmCSUF Discord server's LC-Dailies competition during the month of November.",
  }}
/>

<svelte:head>
  <title>LC-Dailies | O(N)ovember</title>
</svelte:head>

<Spacing --min="100px" --med="100px" --max="100px" />

<main>
  <h1 id="title">
    LC-Dailies
    <small>O(N)ovember 🍂</small>
  </h1>

  {#each Object.entries(data.onovembers) as [year, onovember] (year)}
    <section>
      <h2 id={year}>
        <a href="/onovember#{year}"
          >O(N)ovember {year}
          <small
            >{onovember.totalSubmissions} total submission{onovember.totalSubmissions !== 1
              ? 's'
              : ''}</small
          ></a
        >
      </h2>

      <ol>
        {#each onovember.winners as { usernames, submissionCount }}
          <li>
            {#each usernames as username, i}
              {#if i > 0}, {/if}
              <a href={`https://leetcode.com/${username}`} title={username}>{username}</a>
            {/each}
            <code>{submissionCount}</code> submissions
          </li>
        {/each}
      </ol>

      <div class="onovember-section">
        {#each onovember.calendar as { dayOfMonth, weekdayName, submissionCount, submissionsText, question }}
          {#if question}
            <div
              class="onovember-cell"
              title={submissionsText}
              style:--submission-count={submissionCount}
            >
              {weekdayName} Nov {dayOfMonth}
              <hr />
              Answered by
              <code>{submissionCount}</code>
              <hr />
              <a href={question.url}>{question.title}</a>
            </div>
          {:else}
            <div class="onovember-cell" style:--submission-count="0">
              Nov {dayOfMonth}
              <hr />
              Answered by
              <code>0</code>
            </div>
          {/if}
        {/each}
      </div>
    </section>
  {/each}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  h1 {
    text-align: center;
    font-size: 24px;
    padding: 2em;
  }

  h2 {
    width: 100%;
    text-align: left;
  }

  small {
    font-size: 16px;
    background-color: #666;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    margin-left: 5px;
  }

  .onovember-section {
    --onovember-width: 150px;

    display: grid;
    grid: auto-flow / repeat(auto-fill, minmax(var(--onovember-width), 1fr));
  }

  .onovember-cell {
    background-color: hsl(24, 100%, calc(50% - var(--submission-count, 0) * 5%));
    padding: 1em;
    margin: 0.5em;
    border-radius: 5px;
    display: inline-block;
    text-align: center;
    max-width: var(--onovember-width);
  }

  ol {
    margin: 0 2em 2em 2em;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  code {
    font-size: 16px;
  }
</style>
