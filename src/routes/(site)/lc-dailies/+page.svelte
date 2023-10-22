<script lang="ts">
  import type { PageData } from './$types';
  import { MetaTags } from 'svelte-meta-tags';

  export let data: PageData;
</script>

<MetaTags
  openGraph={{
    title: `LC-Dailies`,
    description: `Showcase of the scores of the players in the acmCSUF Discord server's LC-Dailies competition.`,
  }}
/>

<pre>
  {JSON.stringify(data.seasons)}
</pre>
