<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import SITEMAP from './data';
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<svelte:head>
  <title>SiteMap | ACM at CSUF</title>
</svelte:head>

<div class="sitemap">
  <h1>SiteMap</h1>

  <div>
    {#each SITEMAP as entry}
      <section class="entry" id={entry.id}>
        <h3>{entry.category}</h3>
        <ul>
          <li>
            <a href={entry.link}>Events</a>
          </li>
        </ul>
      </section>
    {/each}
  </div>
</div>

<style>
  .entry {
    margin-left: 100px;
  }
</style>
