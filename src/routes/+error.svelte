<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/button/button.svelte';
  import Bar from '$lib/components/nav/bar.svelte';
  import Footer from '$lib/components/footer/footer.svelte';
  import ErrorGame from '$lib/components/ErrorGame';
</script>

<Bar />

<svelte:head>
  <title>ACM at CSUF / {$page.status || 404}</title>
</svelte:head>

<ErrorGame />
<!-- To do: Convert Error Game into svelte component -->

<Footer />

<style>
  .container {
    height: 700px;
    text-align: center;
    padding-top: 100px;
  }

  h1 {
    font-size: 100px;
    text-shadow: var(--acm-blue) 2px 2px;
    line-height: 1;
  }

  h2 {
    font-size: 1.2rem;
  }

  .gap {
    margin-bottom: 20px;
  }
  section img {
    max-width: 80%;
    min-width: 230px;
    height: auto;
  }

  .text-container {
    min-width: 205px;
  }

  .content-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    width: 80%;
    height: 80%;
    margin: auto;
  }

  /* min-width: 480px */
  @media screen and (min-width: 550px) {
    .content-container {
      flex-direction: row-reverse;
    }
  }
</style>
