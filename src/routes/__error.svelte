<script>
  export let status = 404;
</script>

<svelte:head>
  <title>ACM at CSUF / {status}</title>
  <link rel="stylesheet" href="/global.css" />
</svelte:head>

<section>
  <em>404</em>
  <h1>Frank can't find where you're going!</h1>
  <img src="/assets/png/lost-frank.png" class="wide" alt="404 - Page Not Found" />
  <img src="/assets/png/lost-frank.png" class="mobile" alt="404 - Page Not Found" />
</section>

<style>
  section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 24px;
    color: var(--acm-light);
  }
  section h1 {
    margin-bottom: 2em;
    align-items: center;
    text-align: center;
  }
  section em {
    align-items: center;
    text-align: center;
    font-size: 50px;
    margin-bottom: 0.5em;
    margin-top: 2em;
  }

  section img {
    width: 100%;
    max-width: 1000px;
    height: auto;
    margin-bottom: 3em;
  }

  @media (min-width: 900px) {
    section .mobile {
      display: none;
    }
  }

  @media (max-width: 900px) {
    section .wide {
      display: none;
    }
    section .mobile {
      display: unset;
    }
  }
</style>
