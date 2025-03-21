<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<details>
  <summary>DEBUG</summary>
  <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
</details>

<svelte:head>
  <title>Gallery | ACM at CSUF</title>
</svelte:head>

<!-- TODO: Render gallery page. -->

<section class="gallery">
  {#each data.gallery as item (item.id)}
    <iframe
      src="https://drive.google.com/file/d/{item.id}/preview"
      title="Embedded Document"
      width="640"
      height="480"
      allow="autoplay"
      loading="lazy"
    ></iframe>
  {/each}
</section>

<style>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    padding: 100px 0;
  }
  @media (max-width: 640px) {
    iframe {
      margin: 1em;
      height: 280px;
    }
  }
</style>
