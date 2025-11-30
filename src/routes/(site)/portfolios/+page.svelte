<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import portfolios from './acm-portfolio-sp2024.json';
</script>

<svelte:head>
  <title>Portfolios | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<h1 class="size-xl">Design Portfolio-athon | Spring 2024</h1>
<p class="size-md">
  Check out our members' UI/UX design skills in this once-a-semester portfolio contest.
</p>
<ul>
  {#each portfolios as { title, url, imageURL } (url)}
    <li>
      <h2><span class="acm-pink">{title}</span> Portfolio</h2>
      <a href={url}><img src={imageURL} alt="{title} submission from Devpost" /></a>
    </li>
  {/each}
</ul>

<Spacing --min="175px" --med="200px" --max="200px" />

<style>
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5em;
  }
  ul > li {
    margin: 15px;
    text-align: center;
    width: min(80vw, 600px);
  }

  img {
    height: 90%;
    width: 100%;
  }

  img:hover {
    opacity: 0.5;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
  p {
    text-align: center;
    margin-bottom: 2rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
</style>
