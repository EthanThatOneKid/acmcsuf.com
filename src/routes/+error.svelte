<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/button/button.svelte';
  import Bar from '$lib/components/nav/bar.svelte';
  import Footer from '$lib/components/footer/footer.svelte';
</script>

<Bar />

<svelte:head>
  <title>ACM at CSUF / {$page.status || 404}</title>
</svelte:head>

<section title={$page.error?.message}>
  <em>404</em>
  <h1>Frank can't find where you're going!</h1>
  <Button text={'Return to Home'} link={'/'} />
  <img src="/assets/png/lost-frank.png" alt="404 - Page Not Found" />
</section>

<Footer />

<style>
  section {
    min-height: 100vh;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 24px;
    color: var(--acm-light);
  }

  section h1 {
    align-items: center;
    text-align: center;
  }

  section em {
    align-items: center;
    text-align: center;
    font-size: 50px;
    text-shadow: 2px 2px #92c4df;
    font-weight: 600;
  }

  section img {
    width: 100%;
    max-width: 1000px;
    height: auto;
  }
</style>
