<script>
  import CallToAction from "../ui/call-to-action.svelte";
</script>

<section>
  <div class="main-text-container">
    <h1 class="main-text">
      <span>we are the largest tech<br />community at</span>
      <span class="text-emphasis">CSUF</span>
    </h1>
    <CallToAction text="Join us today!" />
  </div>
  <figure>
    <img
      src="/assets/png/hero-illustration.png"
      alt="Frank the shark (ACM CSUF's mascot) is holding a flag that says 'I ♥ ACM'"
    />
  </figure>
</section>

<style>
  section {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: space-evenly;
    padding-top: 100px; /* Gap left for navbar. */
  }

  section .main-text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  section .main-text-container .main-text {
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
  }

  section .main-text-container .main-text .text-emphasis {
    color: var(--acm-blue);
  }

  section figure {
    display: flex;
    margin: 0 auto;
    margin-inline-start: 0; /* Reset default styling */
    margin-inline-end: 0; /* Reset default styling */
  }

  section figure img {
    width: 270px;
    margin-left: -2rem;
  }

  @media (min-width: 768px) {
    section .main-text-container .main-text {
      font-size: 32pt;
    }

    section figure img {
      width: 420px;
    }
  }

  @media screen and (min-width: 1440px) {
    section {
      flex-direction: row;
      margin: 0 180px 0 180px;
      padding-top: 200px;
    }

    section .main-text-container {
      align-items: flex-start;
    }

    section .main-text-container .main-text {
      font-size: 3rem;
      text-align: left;
    }

    section figure img {
      width: 540px;
      margin-left: -2rem;
    }
  }
</style>
