<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import SITEMAP from './data';
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<svelte:head>
  <title>SiteMap | ACM at CSUF</title>
</svelte:head>


<div class="sitemap">
  <div class="siteHeader">
    <img src="/assets/sitemap.png">
    <h1 class="siteTitle">SITEMAP</h1>
    <h2 class="siteTagline">Check out all our pages!</h2>
  </div>
  <div class="column">
    {#each Object.entries(SITEMAP) as [category, items]}
    <div class="category">
        <h3>{category}</h3>
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
</div>

<style>
  
  .siteHeader{
    max-width: fit-content;
    margin-right: auto;
    margin-bottom: 5%;
    column-count: 2;
  }
  .siteHeader h1{
    margin-top: 40px;
  }
  .siteHeader img{
    height: auto;
    max-width: 25%;
    margin-bottom: 1em;
    margin-left: 350px;
  }
  .category{
    margin-right: 80px;
  }
  .category ul{
    margin-bottom: 20px;
  }

  .siteTagline{
    font-size: small;
  }
  .column{
    column-count: 3;
    max-width: fit-content;
    margin-right: 10px;
    margin-left: 150px;
  }
</style>
