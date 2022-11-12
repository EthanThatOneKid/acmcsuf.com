<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>ACM at CSUF / {$page.status || 404}</title>
</svelte:head>

<section title={$page.error?.message}>
  <em>404</em>
  <h1>Frank can't find where you're going!</h1>
  <a href="/">Return to Home</a>
  <img src="/assets/png/lost-frank.png" alt="404 - Page Not Found" />
</section>

<style>
  a {
    display: block;
    text-align: center;
    padding: 12px 24px;
    background-color: var(--button-bg);
    color: var(--perma-light);
    border-radius: 12px;
    text-decoration: none;
    user-select: none;
    transition: 0.25s ease-in-out;
  }

  a:hover {
    background-color: var(--button-hover);
  }

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
