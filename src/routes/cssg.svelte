<script>
  import Spacing from '$lib/components/sections/spacing.svelte';
</script>

<svelte:head>
  <title>CS Survival Guide!</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<section class="img-section">
  <img src="/assets/cssg/cssg.png" alt="CS Survival Guide flyer" class="flyer" />
</section>

<Spacing --min="100px" --med="175px" --max="200px" />

<section class="img-section">
  <img src="/assets/cssg/itinerary.png" alt="Workshop details" />
</section>

<Spacing --min="100px" --med="175px" --max="200px" />

<section class="img-section">
  <img src="/assets/cssg/workshop-details.png" alt="Workshop details" />
</section>

<Spacing --min="100px" --med="175px" --max="200px" />

<section class="img-section">
  <img src="/assets/cssg/special-thanks.png" alt="Special thanks" />
</section>

<Spacing --min="100px" --med="175px" --max="200px" />

<style lang="scss">
  .itin-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 16px;
    margin: 0 auto;
    max-width: 1200px;
  }

  .itin-title {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .img-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 16px;
    margin: 0 auto;
    max-width: 600px;

    img {
      width: 100%;
      max-width: 600px;
    }
  }
</style>
