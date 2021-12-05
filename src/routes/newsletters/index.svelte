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
  import Spacing from '$lib/components/sections/spacing.svelte';

  export let posts: Newsletter[];
</script>

<Spacing />

<section>
  <h1>Newsletters!</h1>
  <!-- title: string;
  html: string;
  lastEdited: number | null;
  labels: string[];
  author: {
    displayname: string;
    url: string;
    picture: string;
  }; -->
  <ul>
    {#each posts as post (post.id)}
      <li>
        <a href={`/newsletters/${post.id}`}>
          <h2>{post.title}</h2>
          <small>{post.labels.join(', ')}</small>
        </a>
      </li>
    {/each}
  </ul>
</section>

<pre><code>{JSON.stringify(posts, null, 2)}</code></pre>
