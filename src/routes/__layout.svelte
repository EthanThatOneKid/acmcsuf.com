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
  <title>{`acmCSUF / ACM at CSUF`}</title>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <meta name="msapplication-TileColor" content="#000000" />
  <meta name="msapplication-config" content="/browserconfig.xml" />
  <meta name="theme-color" content="#000" />

  <link rel="stylesheet" href="/global.css" />
</svelte:head>

<style>
  main {
    min-height: 100vh;
  }
</style>
