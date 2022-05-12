<script lang="ts" context="module">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/internal';

  export async function load({ fetch }: LoadInput): Promise<LoadOutput> {
    const response = await fetch(`/blog.json`);
    return { props: { posts: await response.json() } };
  }
</script>

<script lang="ts">
  import type { Newsletter } from './_query';
  import Spacing from '$lib/components/sections/spacing.svelte';

  export let posts: Newsletter[] = [];
</script>

<svelte:head>
  <title>acmCSUF / README</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<section>
  <img src="assets/readme-logomark.svg" alt="README by acmCSUF" />

  <h2 class="subtitle headers">
    The official acmCSUF blog.<a href="/blog.xml"
      ><img src="assets/badges/feed-icon.svg" alt="RSS feed logo" /></a
    >
  </h2>

  <Spacing --min="100px" --med="175px" --max="200px" />

  <ul>
    {#each posts as post (post.id)}
      <li class="blog-post">
        <a href={`/blog/${post.id}`} sveltekit:prefetch>
          <h2 class="headers">{post.title}</h2>
          <div class="markdown-body">
            {@html post.html}
          </div>
          <small class="ita">{post.labels.join(', ')}</small>
        </a>
      </li>
    {/each}
  </ul>
</section>

<Spacing --min="40px" --med="95px" --max="120px" />

<style lang="scss">
  .subtitle {
    a {
      display: inline-block;
      padding-left: 2.5vw;
      vertical-align: baseline;

      img {
        width: 18px;
        height: 18px;
      }
    }
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 24px;

    * {
      transition: 0.25s ease-in-out;
    }

    img {
      max-width: 600px;
      width: 100%;
      height: auto;
      margin-left: -2.2vw;
      margin-bottom: 8px;
    }

    ul {
      list-style: none;
      padding: 3em 4em 2.5em;
      margin: 0;
      background-color: var(--acm-light);
      border-radius: 3em;
      filter: drop-shadow(0 8px 40px rgba(16, 19, 21, 0.1));
      -webkit-filter: drop-shadow(0 8px 40px rgba(16, 19, 21, 0.1));
      width: min(1000px, 70vw);

      li {
        cursor: pointer;
        background-color: rgba(56, 182, 255, 0.25);
        border-radius: 1em;
        margin: 2em 0;

        a {
          text-decoration: none;
          padding: 2em;
          display: block;

          .markdown-body {
            max-height: 100px;
            overflow: hidden;
            margin: 16px 0;
          }
        }

        &:hover {
          background-color: rgba(56, 182, 255, 0.5);
        }
      }
    }
  }

  @media (max-width: 900px) {
    section {
      ul {
        padding: 1em 2.5em;

        li {
          border-radius: 1.5em;
        }
      }
    }
  }
</style>
