<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import portfolios from './acm-portfolio-sp2024.json';
</script>

<svelte:head>
  <title>Portfolios | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<h1 class="size-xl">ACM Spring 2024 Portfolio-athon</h1>
<p class="size-md">
  Check out our members' UI/UX design skills in this once-a-semester portfolio contest.
</p>
<ul>
  {#each portfolios as { title, url, imageURL }}
    <li>
      <h2>{title}</h2>
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
  }
  ul > li {
    margin: 15px;
    text-align: center;
    width: min(80vw, 600px);
  }

  img {
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
