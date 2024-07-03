<script lang="ts">
  export let data;
</script>


<section>
  <h1> 2024 ACM Portfolio Competition </h1>
  {#each data.summaries as { title, url, imageURL }}
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
