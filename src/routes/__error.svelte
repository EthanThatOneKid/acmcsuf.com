<script>
  export let status = 404;
</script>

<svelte:head>
  <title>acmCSUF / {status}</title>
</svelte:head>

<section>
  <img src="assets/png/404-h.png" class="wide" alt="404 - Page Not Found" />
  <img src="assets/png/404-v.png" class="mobile" alt="404 - Page Not Found" />
</section>

<style>
  section {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 24px;
  }

  section .mobile {
    display: none;
  }

  section img {
    width: 100%;
    max-width: 1000px;
    height: auto;
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
