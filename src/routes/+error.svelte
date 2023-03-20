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
  <div class="container">
    <div>
      <em>404</em>
      <h1>Frank can't find where you're going!</h1>
      <Button text={'Return to Home'} link={'/'} />
    </div>
    <img src="/assets/png/lost-frank.png" alt="404 - Page Not Found" />
  </div>
</section>

<Footer />

<style>
  .container {
    min-height: 100vh;
    display: flex;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 120vh;
    text-align: center;
  }

  em {
    font-size: 40px;
    text-shadow: rgb(146, 196, 223) 2px 2px;
  }

  section img {
    width: 100%;
    max-width: 1000px;
    height: auto;
  }
</style>
