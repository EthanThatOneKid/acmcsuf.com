<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<pre><code>
  {#each data as item}
      <h1>{item.title}</h1>
    <p>{item.content}</p>
    {/each}
</code></pre>
