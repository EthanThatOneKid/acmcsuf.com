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
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://acmcsuf.com/",
      "name": "ACM at CSUF",
      "identifier": "acmcsuf",
      "description": "The Association for Computing Machinery at California State University, Fullerton",
      "url": "https://acmcsuf.com/",
      "logo": "https://acmcsuf.com/favicon.png",
      "image": "https://acmcsuf.com/assets/capy-power.svg",
      "email": "mailto:acmcsufullerton@gmail.com",
      "sameAs": [
        "https://fullerton.campuslabs.com/engage/organization/acm",
        "https://instagram.com/acmcsuf",
        "https://linkedin.com/company/acm-at-csuf/",
        "https://www.tiktok.com/@acm_at_csuf",
        "https://www.youtube.com/channel/UCDMBj0o4V8Cpt0jgsZLNVVg"
      ],
      "alumni": [
        {
          "@type": "Person",
          "@id": "https://0xd14.id/"
        },
        {
          "@type": "Person",
          "@id": "https://id.etok.me/"
        }
      ]
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
