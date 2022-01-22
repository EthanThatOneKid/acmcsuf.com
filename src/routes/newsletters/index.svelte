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

<Spacing --min="128px" --med="196px" --max="196px" />

<section>
  <img src="static/assets/fully-updated.svg" alt="Blog logo" />

  <img class="badge" src="static/assets/fully-updated-badge.svg" alt="Blog title: Fully Updated" />

  <Spacing --min="64px" --med="100px" --max="128px" />

  <ul>
    {#each posts as post (post.id)}
      <li>
        <a href={`/newsletters/${post.id}`} sveltekit:prefetch>
          <h2>{post.title}</h2>
          <div class="markdown-body">
            {@html post.html}
          </div>
          <small>{post.labels.join(', ')}</small>
        </a>
      </li>
    {/each}
  </ul>

  <Spacing --min="40px" --med="95px" --max="120px" />
</section>

<style lang="scss">
  @import 'static/theme.scss';

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 600px;
    height: auto;
  }

  .badge {
    display: none;
  }

  .markdown-body {
    max-height: 100px;
    overflow: hidden;
  }

  ul {
    list-style: none;
    padding: 2em;
    margin: 0;
    border-radius: 1em;
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
    img {
      display: none;
    }

    .badge {
      display: flex;
      width: 150px;
      height: auto;
    }
  }

  @media (max-width: 340px) {
    img {
      display: none;
    }

    .badge {
      display: flex;
      width: 150px;
      height: auto;
    }
  }
</style>
