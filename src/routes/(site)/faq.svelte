<script lang="ts">
  import Data from '$lib/public/faq/data/faq.json';
  import FAQ from '$lib/components/faq/faq.svelte';

  export let faq = Data;
</script>

<div class="size-md">
  <h1 class="hero-text">
    <span>Frequently Asked Questions</span>
  </h1>
</div>
{#each faq as { question, answer } (question)}
  <FAQ {question} {answer} />
  <p class="seperator" />
{/each}

<style>
  .hero-text {
    text-align: center;
  }

  .seperator {
    margin: 8px 0px;
    border-bottom: 1px solid var(--acm-blue);
    width: 50%;
    margin-inline: 16px;
  }
</style>
