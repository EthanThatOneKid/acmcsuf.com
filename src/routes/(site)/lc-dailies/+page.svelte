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
  <h1>LC-Dailies</h1>

  <p>
    This is a display of the scores achieved by players participating in the <a href="/d"
      >acmCSUF Discord server</a
    >'s LC-Dailies competition. This competition entails daily challenges in solving LeetCode
    problems. Players are ranked based on the number of problems they successfully solve and the
    time they take to do so. These scores reset on a weekly basis.
  </p>

  <p>
    <a href="/lc-dailies-handbook">acmcsuf.com/lc-dailies-handbook</a>
  </p>

  <h2>Seasons</h2>

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
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100ch;
    padding: 20px;
    margin: 0 auto;
  }

  p {
    margin: 10px 0;
    text-indent: 1em;
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

  @media (min-width: 768px) {
    main {
      max-width: 50ch;
    }
  }
</style>
