<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import portfolios from './acm-portfolio-sp2024.json';
</script>

<svelte:head>
  <title>Portfolios | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<ul>
  {#each portfolios as portfolio}
    <li>
      <a href={portfolio.url}>{portfolio.title}</a>
    </li>
  {/each}
</ul>
