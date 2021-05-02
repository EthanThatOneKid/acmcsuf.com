<script>
  import AcmButton from "@/components/utils/acm-button.svelte";
</script>

<section>
  <div class="main-text-container">
    <h1 class="main-text">
      <span>We are the largest tech community at</span>
      <span class="brand-blue">CSUF</span>
    </h1>
    <AcmButton
      text="Join us today!"
      link="https://tinyurl.com/acm-csuf-discord/"
    />
  </div>
  <img
    src="/assets/png/hero-illustration.png"
    alt="Frank the shark (ACM CSUF's mascot) is holding a flag that says 'I ♥ ACM'"
  />
</section>

<style>
  section {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: space-evenly;
  }

  section .main-text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  section .main-text-container .main-text {
    font-weight: bold;
    font-size: var(--heading-font-size);
    text-align: center;
    margin: 0 24px;
  }

  section img {
    width: 270px;
    margin-left: -2rem;
    object-fit: contain;
  }

  @media (min-width: 768px) {
    section .main-text-container .main-text {
      margin: 0 150px;
    }

    section figure img {
      width: 420px;
    }
  }

  @media screen and (min-width: 1440px) {
    section {
      flex-direction: row;
      margin: 0 128px 0 128px;
    }

    section .main-text-container {
      align-items: flex-start;
    }

    section .main-text-container .main-text {
      text-align: left;
      margin: 0;
    }

    section img {
      width: 540px;
    }
  }
</style>
