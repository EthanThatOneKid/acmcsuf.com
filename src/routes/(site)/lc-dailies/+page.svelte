<script lang="ts">
  import type { PageData } from './$types';
  import { MetaTags } from 'svelte-meta-tags';
  import Spacing from '$lib/public/legacy/spacing.svelte';

  export let data: PageData;
</script>

<MetaTags
  openGraph={{
    title: `LC-Dailies`,
    description: `Showcase of the scores of the players in the acmCSUF Discord server's LC-Dailies competition.`,
  }}
/>

<svelte:head>
  <title>LC-Dailies</title>
</svelte:head>

<Spacing --min="100px" --med="100px" --max="100px" />

<pre><code>{JSON.stringify(data.seasons, null, 2)}</code></pre>
