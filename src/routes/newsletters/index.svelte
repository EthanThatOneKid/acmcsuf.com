<script lang="ts" context="module">
  import type { LoadOutput, LoadInput } from '@sveltejs/kit';
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }: LoadInput): Promise<LoadOutput> {
    const response = await fetch(`/newsletters.json`);
    return { props: { posts: await response.json() } };
  }
</script>

<script lang="ts">
  import type { Newsletter } from './_query';
  import Spacing from '$lib/components/sections/spacing.svelte';

  export let posts: Newsletter[];
</script>

<Spacing --min="120px" --med="135px" --max="160px" />

<section>
  <h1>Newsletters!</h1>

  <Spacing />

  <ul>
    {#each posts as post (post.id)}
      <li>
        <a href={`/newsletters/${post.id}`} sveltekit:prefetch>
          <h2>{post.title}</h2>
          <small>{post.labels.join(', ')}</small>
        </a>
      </li>
    {/each}
  </ul>
</section>

<!-- <pre><code>{JSON.stringify(posts, null, 2)}</code></pre> -->
<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: var(--max-h-font-size);
    text-decoration: wavy underline;
    text-underline-offset: 0.5em;
  }

  ul {
    list-style: none;
    padding: 2em;
    margin: 0;
    border-radius: 2em;
    border: 2px solid var(--acm-sky);
    width: min(1000px, 77vw);
  }

  li {
    background-color: var(--acm-sky-light);
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    border-radius: 2em;
    padding: 1em;
    margin: 1em 0;

    * {
      text-decoration: none;
    }
  }

  li:hover {
    text-decoration: underline;

    * {
      text-decoration: none;
    }
  }

  @media (max-width: 1440px) {
    h1 {
      font-size: var(--h-font-size-med);
    }
  }

  @media (max-width: 340px) {
    h1 {
      font-size: var(--min-h-font-size);
    }
  }
</style>
