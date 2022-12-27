<script lang="ts">
  import { makeBlogPostsPageUrl } from '$lib/public/blog/urls';

  export let data: string[] = [];
  export let selectedLabels: string[] = [];

  // Use the function below to create a URL for the blog posts page building on the
  // currently selected labels.
  //
  // function stackNextLabels(label: string) {
  //   return selectedLabels.includes(label) ? selectedLabels : [...selectedLabels, label];
  // }
</script>

{#if data.length > 0}
  <div class="labels">
    {#each data as label}
      <a
        href={makeBlogPostsPageUrl([label])}
        class:selected={selectedLabels.includes(label)}
        data-sveltekit-prefetch
        target="_blank"
        rel="noopener noreferrer">#{label}</a
      >
    {/each}
  </div>
{/if}

<style lang="scss">
  .labels {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.2em;
    font-size: 1em;

    a {
      background-color: var(--acm-light);
      color: var(--acm-dark);
      border-radius: var(--size-sm);
      border: 2px solid #e0e0e0;
      padding: 0.25em 0.8em 0.25em 0.8em;
      text-decoration: none;
    }

    .selected {
      background-color: #81d4fa;
      border-color: #4fc3f7;
      color: var(--perma-dark);
      pointer-events: not-allowed;
    }
  }
</style>
