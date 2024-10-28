<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';

  import TeamCard from './team-card.svelte'

  const cards = [
    {
      title: "Algo",
      description: "algo desc"
    },
    {
      title: "Open Source",
      description: "Our inspiration for this team surrounds this area of exploring space." +
      "The world of open source programming is endless and diving into it might seem " +
      "scary at first, but we find that discovering new things to be exciting. To best " +
      "represent this, our logo was designed as a rocket ship to represent the ability to launch" +
      "into the vast expanse of collaborative development, exploring new frontiers and " +
      "innovating together"
    },
    {
      title: "AI",
      description: "ai desc"
    },
  ]

</script>

<svelte:head>
  <title>Branding | ACM at CSUF</title>
</svelte:head>


<Spacing --min="175px" --med="200px" --max="200px" />

<main class="responsive-width">
  <section id="top">
    <div class="header">
      <h1 class="size-xl">BRANDING</h1>
      <p>Find information about our branding alongside a collection of resources and assets.</p>

    </div>

    {#each cards as card}
      <TeamCard
        title={card.title}
        description={card.description}
      />
      <br>
    {/each}




  </section>

  <p>
    <a href="#top">Back to top</a> | <a href="/global.css">global.css</a>
  </p>
</main>


<style>
  .responsive-width {
    width: min(80ch, 80vw);
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    .responsive-width {
      width: 100%;
    }
  }

  p {
    margin: 1em 0;
    word-break: break-word;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  main section {
    margin: 0 auto;
    margin-bottom: 50px;
  }

  main h1 {
    text-align: center;
    margin: 0;
  }

  main a {
    transition: 0.25s ease-in-out;
  }

  main:hover {
    color: var(--acm-blue);
  }
</style>
