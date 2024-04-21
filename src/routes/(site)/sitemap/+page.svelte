<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import SITEMAP from './data';
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<svelte:head>
  <title>SiteMap | ACM at CSUF</title>
</svelte:head>

<section class="sitemap-header">
  <img src="/assets/sitemap-logo.svg" alt="Sitemap icon in diamond" />

  <div>
    <h1 class="size-xxl">SITEMAP</h1>
    <h2 class="size-md">Check out all our pages!</h2>
  </div>
</section>

<section class="sitemap-body">
  <div class="column">
    {#each Object.entries(SITEMAP) as [category, items]}
      <div class="category">
        <h2>{category}</h2>
        <ul>
          {#each items as item}
            <li>
              <a href={item.link}>{item.title}</a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 24px;
  }

  section div h1 {
    font-weight: 550;
    height: 95px;
    line-height: 100px;
  }

  section div h2 {
    font-weight: 600;
    margin-left: 5px;
  }

  section img {
    max-width: 200px;
    width: 100%;
    height: auto;
    margin-bottom: 8px;
    margin-right: 2vw;
  }

  section div li {
    margin-left: 30px;
  }

  section div li a {
    text-decoration: none;
  }

  @media (max-width: 600px) {
    .sitemap-header {
      flex-direction: column;
    }

    .sitemap-header div h2 {
      text-align: center;
    }
  }

  @media (max-width: 900px) {
    .sitemap-body {
      display: flex;
      flex-direction: row; /* I want this to be in columns */
    }
  }
</style>
