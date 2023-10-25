<script lang="ts">
  import type { PageData } from './$types';
  import { MetaTags } from 'svelte-meta-tags';
  import Spacing from '$lib/public/legacy/spacing.svelte';

  export let data: PageData;
</script>

<MetaTags
  openGraph={{
    title: 'LC-Dailies',
    description:
      "Showcase of the scores of the players in the acmCSUF Discord server's LC-Dailies competition.",
  }}
/>

<svelte:head>
  <title>LC-Dailies</title>
</svelte:head>

<Spacing --min="100px" --med="100px" --max="100px" />

<main>
  <ol>
    {#each data.seasons as season}
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
</main>

<style>
  main {
    text-align: center;
    padding: 20px;
  }

  ol {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 10px 0;
  }

  a {
    text-decoration: none;
    color: #0078d4; /* Hyperlink color */
  }

  a:hover {
    text-decoration: underline;
  }

  time {
    font-style: italic;
    font-size: 0.9em;
    display: block;
  }
</style>
