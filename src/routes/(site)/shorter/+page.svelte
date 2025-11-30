<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import { LINKS } from '$lib/public/links';
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<svelte:head>
  <title>Shortlinks | ACM at CSUF</title>
</svelte:head>

<main class="responsive-width">
  <section id="top">
    <div class="header">
      <h1 class="size-lg">Shortlinks</h1>
    </div>
    <p class="acm-heaviest">
      {#each Object.entries(LINKS) as [pathname, destination] (pathname)}
        {pathname}: <a href={destination}>{destination}</a>
        <br />
        <br />
      {/each}
    </p>
  </section>

  <p>
    <a href="#top">Back to top</a> | <a href="https://github.com/acmcsufoss/shorter">Source code</a>
    | <a href="/shorter-handbook">Handbook</a>
  </p>
</main>

<Spacing --min="40px" --med="95px" --max="120px" />

<style lang="scss">
  .responsive-width {
    width: min(800px, 80vw);
    max-width: 540px;
    margin: 0 auto;
  }

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    section {
      width: min(800px, 80vw);
      max-width: 540px;
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
