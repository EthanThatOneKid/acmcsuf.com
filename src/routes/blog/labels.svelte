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
        target="_blank">#{label}</a
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
      border-radius: 5px;
      padding: 0.3em;
      text-decoration: none;
    }

    .selected {
      background-color: var(--acm-gray);
      color: var(--perma-light);
      pointer-events: not-allowed;
    }
  }
</style>
