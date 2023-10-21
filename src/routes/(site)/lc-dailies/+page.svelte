<script lang="ts">
  import type { PageData } from './$types';
  import { MetaTags } from 'svelte-meta-tags';

  export let data: PageData;
</script>

<MetaTags
  openGraph={{
    title: `LC-Dailies`,
    description: `LC-Dailies leaderboards.`,
  }}
/>

<pre>
  {JSON.stringify(data.seasons)}
</pre>
