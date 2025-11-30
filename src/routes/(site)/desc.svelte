<section class="desc-container">
  <div class="desc-inner-container">
    <img src="/assets/chip-holding-laptop.png" alt="Chip the Capybara holding a laptop" />
    <div class="desc-text">
      <h1 class="acm-heavier size-xl">Bringing you the true Computer Science Experience</h1>
      <p>
        We are a chapter club of the Association for Computing Machinery organization. Our goal is
        to expose passionate people of all levels to grow their skills in a collaborative community.
      </p>

      <div class="sponsor-section">
        <h1 class="sponsor-title size-md">Sponsored by</h1>
        <img src="/sponsors/google-logo.png" class="sponsor-logo" alt="Google Logo" />
      </div>
    </div>
  </div>
</section>

<style>
  section {
    display: grid;
  }

  .desc-inner-container {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 1em;
  }

  .desc-text {
    display: grid;
    align-items: center;
    text-align: center;
  }

  .desc-text p {
    margin: 1em;
    font-size: var(--size-md);
  }

  .desc-inner-container img {
    max-width: clamp(20rem, 17.342rem + 10.13vw, 30rem);
    justify-self: center;
  }

  .sponsor-section {
    display: grid;
    justify-items: center;
    align-items: center;
    margin-top: 1em;
    gap: 0.5em;
  }

  .sponsor-logo {
    height: auto;
    width: 80px;
    margin-bottom: 1em;
  }

  @media (min-width: 768px) {
    section {
      place-items: center;
      max-width: 1280px;
      margin: 0 auto;
    }

    .desc-inner-container {
      grid-template-columns: 1fr 1fr;
      gap: 4em;
    }

    .desc-text {
      text-align: start;
      margin: 3%;
    }

    .desc-text p {
      margin: 0;
      margin-top: 3%;
      font-size: var(--size-lg);
    }

    .sponsor-section {
      display: flex;
      align-items: center;
      margin-top: 2em;
    }

    .sponsor-logo {
      width: 110px;
      margin-bottom: 0;
    }
  }
</style>
