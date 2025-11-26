<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import TeamCard from './branding-card.svelte';
  import Branding_Details from './data';
  let cards = Branding_Details;
</script>

<svelte:head>
  <title>Branding | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<main class="responsive-width">
  <section id="top">
    <div class="header">
      <img src="/assets/figma-capy.svg" alt="Branding Badge" />
      <div class="header-content">
        <h1 class="size-xl">BRANDING</h1>
        <p class="p-info">
          Find more information about our branding alongside a collection of resources and assets.
        </p>
      </div>
    </div>

    {#each cards as card}
      <TeamCard info={card} />
      <br />
    {/each}
  </section>

  <p>
    <a href="#top">Back to top</a> | <a href="/global.css">global.css</a>
  </p>
</main>

<style>
  .header {
    display: flex;
    flex-direction: row-reverse;
    align-items: center; /* Align items to the top */
    justify-content: space-between; /* Ensure the image stays on the right */
    gap: 20px; /* Optional: Space between title section and image */
    width: 100%;
    margin-bottom: 10%;
  }

  .header-content {
    display: flex;
    flex-direction: column;
    max-width: 60%; /* Adjust as necessary */
  }

  .header h1 {
    margin-top: 10%;
    text-align: left;
  }

  .p-info {
    margin-top: 10px;
    text-align: left;
  }

  .header img {
    max-width: 30%;
    height: auto;
    align-self: flex-start;
  }

  .responsive-width {
    width: min(80ch, 80vw);
    margin: 0 auto;
    padding-left: 1em; /* Aligns the left padding */
  }

  main p {
    margin: 1em 1em 1em 0; /* Match left margin of p */
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

  @media (max-width: 768px) {
    .responsive-width {
      width: 92%;
      padding-left: 2%;
      padding-right: 2%;
    }

    .header {
      flex-direction: column;
      margin-bottom: 0px;
    }

    .header-content {
      max-width: 100%;
    }

    .header h1 {
      margin-top: 0px;
      text-align: center;
    }

    .p-info {
      margin-top: 10px;
      text-align: center;
      margin-bottom: 20%;
    }

    .header img {
      align-self: center;
      max-width: 40%;
      margin-bottom: 5%;
    }
  }
</style>
