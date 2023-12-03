<section class="desc-container">
  <div class="desc-inner-container">
    <img src="/assets/png/chip-holding-laptop.png" alt="Chip the Capybara holding a laptop" />
    <div class="desc-text">
      <h1 class="brand-header size-xl">Bringing you the true Computer Science Experience</h1>
      <p>
        We are a chapter club of the Association for Computing Machinery organization. Our goal is
        to expose passionate people of all levels to grow their skills in a collaborative community.
      </p>
    </div>
  </div>
</section>

<style>
  section {
    display: grid;
  }

  section .desc-inner-container {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 1em;
  }

  section .desc-inner-container .desc-text {
    display: grid;
    align-items: center;
    text-align: center;
  }

  section .desc-inner-container .desc-text p {
    margin: 1em;
    font-size: var(--size-md);
  }

  section .desc-inner-container img {
    max-width: clamp(20rem, 17.342rem + 10.13vw, 30rem);
    justify-self: center;
  }

  @media screen and (min-width: 768px) {
    section {
      display: grid;
      place-items: center;
      align-items: center;
      max-width: 1280px;
      margin: 0 auto;
    }
  
  

    section .desc-inner-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 4em;
    }

    section .desc-inner-container .desc-text {
      text-align: start;
      margin: 3%;
    }

    section .desc-inner-container .desc-text p {
      font-size: var(--size-lg);
      margin: 3%;
    }
  }
</style>
