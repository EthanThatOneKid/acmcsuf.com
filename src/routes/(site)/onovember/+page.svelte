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
    <h2 id={year}><a href="/onovember#{year}">{year}</a></h2>

    <div class="onovember-section">
      {#each Array.from({ length: 30 }).map((_, i) => i + 1) as i (i)}
        {@const { daily, submissionCount } = {
          daily: onovember.dailies[(i + 1).toString()],
          submissionCount: Object.values(onovember.dailies[(i + 1).toString()]?.playerIDs ?? {})
            .length,
        }}
        {#if daily}
          <div class="onovember-cell" style:--submission-count={submissionCount}>
            <a href={daily.questionURL} title={daily.questionTitle}>Nov {i}<br /></a><code
              >{submissionCount}</code
            > submissions
          </div>
        {:else}
          <div class="onovember-cell" style:--submission-count="0">
            Nov {i}<br /><code>0</code> submissions
          </div>
        {/if}
      {/each}
    </div>
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
    background-color: hsl(24 calc(var(--submission-count, 0%) * 100%) 50%);
    padding: 1em;
    margin: 0.5em;
    border-radius: 5px;
    display: inline-block;
    text-align: center;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
