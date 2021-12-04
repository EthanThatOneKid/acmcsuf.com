<script lang="ts" context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch, page }) {
    const { id: slug } = page.params;
    const response = await fetch(`/newsletters/${slug}.json`);
    return { props: { posts: await response.json() } };
  }
</script>

<script lang="ts">
  import type { Newsletter } from './_query';

  export let posts: Newsletter[];
</script>

<h1>Newsletter!</h1>

<pre><code>{JSON.stringify(posts, null, 2)}</code></pre>
