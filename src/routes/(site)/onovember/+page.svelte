<script lang="ts">
  import type { PageData } from './$types';
  import { MetaTags } from 'svelte-meta-tags';
  import Spacing from '$lib/public/legacy/spacing.svelte';

  export let data: PageData;

  console.log({ data });
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
    <h2>{year}</h2>

    {#each Array.from({ length: 30 }) as _, i (i)}
      {@const daily = onovember.dailies[(i + 1).toString()]}
      {#if daily}
        <p>
          <a href={daily.questionURL}>{daily.questionTitle}</a> - {Object.values(
            daily.submissionIDs
          ).length} submissions
        </p>
      {:else}
        <p>No submissions</p>
      {/if}
    {/each}

    <!-- <div>
      <ol>
        // Days of November
        {#each Array.from({ length: 30 }, (_, i) => i + 1) as day}
          <li>
            <a href="/lc-dailies/{year}-11-{day}">{day}</a>
          </li>
        {/each}
      </ol>
    </div>

    <ol>
      {#each seasons as season}
        <li id={season.id}>
          <a href="/lc-dailies/{season.id}">
            Season {season.id}
          </a>
          <time datetime={season.start_date}>
            {season.start_date}
          </time>
        </li>
      {/each}
    </ol> -->
  {/each}

  <!-- <pre><code>{data.seasonText}</code></pre>

  <table>
    <tr>
      <th colspan="2">Data</th>
    </tr>
    <tr>
      <td>Season ID</td>
      <td><code>{data.season?.id}</code></td>
    </tr>
    <tr>
      <td>Start date</td>
      <td>{data.season?.start_date}</td>
    </tr>
    <tr>
      <td>Total players</td>
      <td>{totalPlayers}</td>
    </tr>
    <tr>
      <td>Total submissions</td>
      <td>{totalSubmissions}</td>
    </tr>
    <tr>
      <td>Last synced</td>
      <td>{data.season?.synced_at ?? 'Never'}</td>
    </tr>
  </table> -->
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

  small {
    font-size: 16px;
    background-color: #666;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    margin-left: 5px;
  }
</style>
