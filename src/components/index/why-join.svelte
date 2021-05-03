<script lang="ts">
</script>

<section>
  <img
    src="assets/png/why-join-illustration.png"
    alt="Social event with acmCSUF club members."
  />
  <div>
    <h2>
      Why should students join <span class="brand-em"
        >acm<span class="brand-blue">CSUF</span></span
      >?
    </h2>
    <p>
      <span class="brand-em">acm<span class="brand-blue">CSUF</span></span>
      is a community that encourages growth, friendship, and technical development.
      We prepare each other to overcome future personal, academic, and professional
      challenges that some may face down the road. By joining
      <span class="brand-em">acm<span class="brand-blue">CSUF</span></span>,
      you'll be stepping into a community that will help you get started on your
      tech journey.
    </p>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
  }

  section img {
    width: 270px;
  }

  section div h2 {
    text-transform: lowercase;
    font-weight: bold;
    text-align: center;
    font-size: var(--heading-font-size);
  }

  section div p {
    text-align: center;
    font-size: var(--body-font-size);
  }

  @media (min-width: 768px) {
    section {
      padding: 0 180px;
    }
  }

  @media screen and (min-width: 1440px) {
    section {
      flex-direction: row;
    }

    section img {
      width: 420px;
    }

    section div h2 {
      text-align: right;
    }

    section div p {
      text-align: right;
    }
  }
</style>
