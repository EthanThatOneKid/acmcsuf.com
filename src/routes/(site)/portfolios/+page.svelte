<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import portfolios from './acm-portfolio-sp2024.json';
  //export let data;
</script>

<svelte:head>
  <title>Portfolios | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<section>
  {#each portfolios as { title, url, imageURL }}
    <div>
      <h2>{title}</h2>
      <a href={url}><img src={imageURL} style="width: 600px;"></a>
      
    </div>
  {/each}
</section>

<style>
  section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    
    
  }
  section > div {
    margin: 15px;
    text-align: center;
    
  }
  img:hover {
    opacity: 0.5;
  }
</style>




