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

    <ul>
      {#each data.colors as color (color.id)}
        <li><Color data={color} /></li>
      {/each}
    </ul>
  </section>

  <p>
    <a href="#top">Back to top</a> | <a href="/global.css">global.css</a>
  </p>
</main>

<Spacing --min="40px" --med="95px" --max="120px" />

<style lang="scss">
  .responsive-width {
    width: min(80ch, 80vw);
    margin: 0 auto;
  }

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 1em 0;
  }

  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    section {
      margin: 0 auto;
      margin-bottom: 50px;

      p {
        margin: 1em 0;
        word-break: break-word;
      }

      a {
        transition: 0.25s ease-in-out;

        &:hover {
          color: var(--acm-blue);
        }
      }
    }
  }
</style>
