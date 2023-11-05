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
        {#each onovember.winners as { usernames, submissionCount } (name)}
          <li>
            {#each usernames as username, i (i)}
              {#if i > 0}, {/if}
              <a href={`https://leetcode.com/${username}`} title={username}>{username}</a>
            {/each}
            <code>{submissionCount}</code> submissions
          </li>
        {/each}
      </ol>

      <div class="onovember-section">
        {#each onovember.calendar as { dayOfMonth, submissionCount, submissionsText, question }, i (i)}
          {#if question}
            <div class="onovember-cell" style:--submission-count={submissionCount}>
              <a href={question.url} title={submissionsText}>Nov {dayOfMonth}<br /></a><code
                >{submissionCount}</code
              > submissions
            </div>
          {:else}
            <div class="onovember-cell" style:--submission-count="0">
              Nov {dayOfMonth}<br /><code>0</code> submissions
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

  .onovember-cell {
    background-color: hsl(24, 100%, calc(50% - var(--submission-count, 0) * 5%));
    padding: 1em;
    margin: 0.5em;
    border-radius: 5px;
    display: inline-block;
    text-align: center;
  }

  ol {
    margin-left: 0px;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
