<script lang="ts">
  import AcmButton from '$lib/components/button/button.svelte';
</script>

<section class="hero-container">
  <div class="hero-inner-container">
    <div class="hero-text">
      <h1 class="brand-header size-xl">
        <span>We are the largest</span> <span class="multicolor-text">Computer Science</span>
        <span>community at CSUF</span>
      </h1>
      <div class="join-button">
        <AcmButton text="Join today!" link="/discord" redirect={true} />
      </div>
    </div>

    <img
      src="/assets/png/capy-power.png"
      alt="Chip the Capybara surrounded by all ACM Team badges"
    />
  </div>
</section>

<style>
  section {
    display: grid;
  }

  section .hero-inner-container {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 1em;
  }

  section .hero-inner-container .hero-text {
    display: grid;
    align-items: center;
    text-align: center;
    gap: 1em;
  }

  section .hero-inner-container .hero-text span.multicolor-text {
    background: linear-gradient(
      to right,
      var(--acm-turquoise),
      var(--acm-blue),
      var(--acm-bluer),
      var(--acm-purple),
      var(--acm-pink)
    );
    color: transparent;
  }

  section .hero-inner-container .hero-text span {
    display: block;
  }

  section .hero-inner-container .hero-text .join-button {
    display: grid;
    justify-self: center;
  }

  section .hero-inner-container img {
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

    section .hero-inner-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 4em;
    }

    section .hero-inner-container .hero-text {
      text-align: start;
    }

    section .hero-inner-container .hero-text .join-button {
      justify-self: start;
    }
  }
</style>
