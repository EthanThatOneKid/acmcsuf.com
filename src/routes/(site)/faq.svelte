<script lang="ts">
  import Data from '$lib/public/faq/data/faq.json';
  import FAQ from '$lib/components/faq/faq.svelte';

  export let faq = Data;
</script>

<div class="size-md">
  <h1 class="faq-title">Frequently Asked Questions</h1>
</div>

<section>
  {#each faq as { question, answer } (question)}
    <FAQ {question} {answer} />
  {/each}
</section>

<style>
  .faq-title {
    text-align: center;
  }

  section {
    max-width: 950px;
    margin-block-start: 2.5rem;
    margin-inline: auto;
    padding-inline: 2rem;
  }
</style>
