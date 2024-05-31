<script>
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import Hero from './hero.svelte';
  import Desc from './desc.svelte';
  import Teams from './teams.svelte';
  import Lucky from './lucky.svelte';
  // import Blog from './blog.svelte';
</script>

<svelte:head>
  <title>ACM at CSUF</title>

  <!-- Pasted example:
  https://developers.google.com/search/docs/appearance/structured-data/organization#example -->
  <!-- Pasted example:
  https://developers.google.com/search/docs/appearance/structured-data/organization#example -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "image": "https://www.example.com/example_image.jpg",
      "url": "https://www.example.com",
      "sameAs": ["https://example.net/profile/example1234", "https://example.org/example1234"],
      "logo": "https://www.example.com/images/logo.png",
      "name": "Example Corporation",
      "description": "The example corporation is well-known for producing high-quality widgets",
      "email": "contact@example.com",
      "telephone": "+47-99-999-9999",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rue Improbable 99",
        "addressLocality": "Paris",
        "addressCountry": "FR",
        "addressRegion": "Ile-de-France",
        "postalCode": "75001"
      },
      "vatID": "FR12345678901",
      "iso6523Code": "0199:724500PMK2A2M1SQQ228"
    }
  </script>
</svelte:head>

<div class="sections-container">
  <div class="section-container">
    <Spacing --min="175px" --med="200px" --max="200px" />

    <Hero />

    <Spacing --min="120px" --med="175px" --max="200px" />
  </div>

  <div class="section-container">
    <Spacing --min="175px" --med="200px" --max="200px" />

    <Desc />

    <Spacing --min="120px" --med="175px" --max="200px" />
  </div>

  <div class="section-container">
    <Spacing --min="175px" --med="200px" --max="200px" />

    <Teams />

    <Spacing --min="120px" --med="175px" --max="200px" />
  </div>

  <!-- <div class="section-container">
    <Spacing --min="175px" --med="200px" --max="200px" />

    <Testimony /> 

    <Spacing --min="120px" --med="175px" --max="200px" /> 
  </div> -->

  <div class="section-container">
    <Spacing --min="175px" --med="200px" --max="200px" />

    <Lucky />

    <!-- <Spacing --min="120px" --med="175px" --max="200px" /> -->
  </div>

  <!-- <div class="section-container">
    <Spacing --min="175px" --med="200px" --max="200px" />

    <Blog />

    <Spacing --min="75px" --med="100px" --max="120px" />
  </div> -->
</div>

<style>
  .section-container {
    background-color: var(--acm-odd);
  }

  .section-container:nth-child(even) {
    background-color: var(--acm-even);
  }
</style>
