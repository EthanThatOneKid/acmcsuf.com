<script>
  import NavBar from './navbar.svelte';
</script>

<svelte:head>
  <title>Frank's Portfolio</title>
  <link rel="stylesheet" href="/assets/portfolio/demo/portfolio.css" />
</svelte:head>

<div id="app">
  <NavBar />
  <main>
    <slot />
  </main>
</div>

<style>
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    margin: 1rem;
    font-size: 1.25rem;
  }
</style>
