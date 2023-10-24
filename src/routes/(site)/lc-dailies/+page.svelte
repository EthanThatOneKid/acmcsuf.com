<script lang="ts">
  import type { PageData } from './$types';
  import { formatScores } from 'lc-dailies/esm/leaderboard/scores';
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
  {#each data.seasons as season}
    <pre><code>{formatScores(season)}</code></pre>
  {/each}
</main>
