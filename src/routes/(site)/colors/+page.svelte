<script lang="ts">
  import type { PageData } from './$types';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import Color from './color.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Colors | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<main class="responsive-width">
  <section id="top">
    <div class="header">
      <h1 class="size-lg">Colors</h1>
    </div>

    <p>
      Documentation generated straight from the <a href="/global.css">global.css</a> file.
    </p>

    <table>
      {#each data.colors as color (color.id)}
        <Color data={color} />
      {/each}
    </table>
  </section>

  <p>
    <a href="#top">Back to top</a> | <a href="/global.css">global.css</a>
  </p>
</main>

<Spacing --min="40px" --med="95px" --max="120px" />

<style>
  .responsive-width {
    width: min(80ch, 80vw);
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    .responsive-width {
      width: 100%;
    }
  }

  p {
    margin: 1em 0;
    word-break: break-word;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  main section {
    margin: 0 auto;
    margin-bottom: 50px;
  }

  main h1 {
    margin: 0;
  }

  main a {
    transition: 0.25s ease-in-out;
  }

  main:hover {
    color: var(--acm-blue);
  }

  main table {
    width: 100%;
    table-layout: fixed;
  }

  main table :global(td) {
    width: 50%;
  }
</style>
