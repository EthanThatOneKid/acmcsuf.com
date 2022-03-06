<script lang="ts">
  import Navbar from '$lib/components/sections/navbar.svelte';
  import Footer from '$lib/components/sections/footer.svelte';
  import AcmToaster from '$lib/components/utils/acm-toaster.svelte';
</script>

<Navbar />
<main><slot /></main>
<Footer />
<AcmToaster />

<svelte:head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>acmCSUF / ACM at CSUF</title>
</svelte:head>

<style>
  main {
    min-height: 100vh;
  }
</style>
