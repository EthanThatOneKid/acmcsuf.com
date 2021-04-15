<script lang="ts">
</script>

<section>
  <img
    src="assets/png/why-join-illustration.png"
    alt="Social event with acmCSUF club members."
  />
  <div>
    <h2>why should students join acm?</h2>
    <p>
      <span class="brand-em">acm<span class="brand-em">CSUF</span></span>
      strives to be a community that encourages growth, friendship, and technical
      development to prepare people for challenges in their personal lives, school
      lives, and careers. By joining <span class="brand-em">acm</span>, you'll
      be stepping into a community that will help you get started on your tech
      journey.
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
