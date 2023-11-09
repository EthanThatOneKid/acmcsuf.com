<script lang="ts">
  import type { PageData } from './$types';
  import { MetaTags } from 'svelte-meta-tags';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import { page } from '$app/stores';

  export let data: PageData;

  const totalSubmissions = Object.keys(data.season?.submissions ?? {}).reduce(
    (sum, userID) => (sum += Object.keys(data.season?.submissions[userID] ?? {}).length),
    0
  );

  const totalPlayers = Object.keys(data.season?.submissions ?? {}).length;
</script>

<MetaTags
  openGraph={{
    title: `LC-Dailies | ${data.season?.id}`,
    description:
      "Showcase of the scores of the players in the acmCSUF Discord server's LC-Dailies competition.",
  }}
/>

<svelte:head>
  <title>LC-Dailies | {$page.params.season_id}</title>
</svelte:head>

<Spacing --min="100px" --med="100px" --max="100px" />

<main>
  <h1 id="title">
    LC-Dailies
    <small>Season {$page.params.season_id}</small>
  </h1>

  <pre><code>{data.seasonText}</code></pre>

  <table>
    <tr>
      <th colspan="2">Data</th>
    </tr>
    <tr>
      <td>Season ID</td>
      <td
        ><a href="https://lc-dailies.deno.dev/seasons/{data.season?.id}"
          ><code>{data.season?.id}</code></a
        ></td
      >
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
