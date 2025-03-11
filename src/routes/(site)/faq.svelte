<script lang="ts">
  import Data from '$lib/public/faq/data/faq.json';
  import FAQ from '$lib/components/faq/faq.svelte';

  export let faq = Data;
</script>

<div class="size-md">
  <h1 class="faq-title">Frequently Asked Questions</h1>
</div>
{#each faq as { question, answer } (question)}
  <FAQ {question} {answer} />
{/each}

<style>
  .faq-title {
    text-align: center;
    margin-block-end: 1.5rem;
  }
</style>
