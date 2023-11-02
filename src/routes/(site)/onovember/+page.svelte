<script lang="ts">
  import type { PageData } from './$types';
  import { MetaTags } from 'svelte-meta-tags';
  import Spacing from '$lib/public/legacy/spacing.svelte';

  export let data: PageData;

  // const totalSubmissions = Object.keys(data.season?.submissions ?? {}).reduce(
  //   (sum, userID) => (sum += Object.keys(data.season?.submissions[userID] ?? {}).length),
  //   0
  // );

  // const totalPlayers = Object.keys(data.season?.submissions ?? {}).length;

  const dailies = Object.entries(data.seasonsMap).reduce(
    (acc, [year, seasons]) => {
      // TODO: Sort and format seasons.
      // acc[year] = 
    },
    {} as Record<number, {
      questionTitle: string;
      questionURL: string;
      submissionIDs: string[];
    }[]>
  );

  const rankings =
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

  {#each Object.entries(data.seasonsMap) as [year, seasons] (year)}
    <h2>{year}</h2>

    <div>
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
    </ol>
  {/each}

  <pre><code>{data.seasonText}</code></pre>

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
  </table>
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

  pre {
    margin: 2em;
    padding: 1em;
    border-radius: 5px;
    font-family: monospace;
    overflow-x: auto;
    outline: 3px dashed #666;
  }

  code {
    font-family: monospace;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    text-align: left;
  }

  th,
  td {
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
  }

  th {
    font-weight: bold;
  }

  td:nth-child(1) {
    font-weight: bold;
  }

  @media screen and (min-width: 768px) {
    table {
      width: auto;
    }

    th,
    td {
      width: 200px;
      padding: 1rem;
    }
  }

  @media screen and (max-width: 767px) {
    th,
    td {
      width: 100%;
      display: block;
    }

    th {
      display: none; /* Hide headers in smaller screens */
    }
  }
</style>
