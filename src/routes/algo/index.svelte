<script lang="ts" context="module">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/internal';

  export async function load({ fetch }: LoadInput): Promise<LoadOutput> {
    const response = await fetch(`/algo.json`);
    return { props: { posts: await response.json() } };
  }
</script>

<script lang="ts">
  import type { AlgoResource } from './_query';
  import Spacing from '$lib/components/sections/spacing.svelte';
  import CommonHero from '$lib/components/sections/common-hero.svelte';
  import HashTable from '$lib/components/algo/hash-table.svelte';

  export let posts: AlgoResource[] = [];

  // Show the HashMap component temporarily until tomorrow
  const showAlgoOfTheWeek = new Date('2022-04-11T12:00Z') > new Date();
</script>

<svelte:head>
  <title>acmCSUF / README</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<section>
  <!-- <img src="assets/readme-logomark.svg" alt="README by acmCSUF" /> -->

  <CommonHero>
    <h2 slot="headline" class="size-lg">
      What is acm<span class="brand-purple brand-em">Algo</span>?
    </h2>
    <p slot="text" class="size-xs">
      This path is dedicated to building the programming proficiency of students. acm<span
        class="brand-purple brand-em">Algo</span
      > focuses on mastering data structures and algorithms, enhancing problem solving abilities, and
      exploration of competitive programming.
    </p>
  </CommonHero>

  <Spacing --min="100px" --med="125px" --max="150px" />

  {#if showAlgoOfTheWeek}
    <h2 class="size-lg headers">This week's data structure: <b>Hash Map</b></h2>

    <Spacing --min="50px" --med="50px" --max="50px" />

    <HashTable />
  {/if}

  <Spacing --min="100px" --med="125px" --max="150px" />

  <ul>
    {#each posts as post (post.id)}
      <li>
        <a href={`/algo/${post.id}`} sveltekit:prefetch>
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
        background-color: rgba(var(--acm-algo-rgb), 0.25);
        border-radius: 1em;
        padding: 2em;
        margin: 2em 0;

        a {
          text-decoration: none;

          .markdown-body {
            max-height: 100px;
            overflow: hidden;
            margin: 16px 0;
          }
        }

        &:hover {
          background-color: rgba(var(--acm-algo-rgb), 0.5);
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
