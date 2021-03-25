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
      <span class="bold">acm<span class="blue">CSUF</span></span>
      strives to be a community that encourages growth, friendship, and personal/technical
      development to prepare people for challenges in their personal lives, school
      lives, and industry lives. By joining <span class="bold">acm</span>,
      you'll be stepping into a community that will help you get started on your
      tech journey.
    </p>
  </div>
</section>

<style>
  .bold {
    font-weight: bold;
  }
  .blue {
    color: var(--acm-blue);
  }
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 150px 20px;
  }
  section img {
    width: 270px;
  }
  section div {
    max-width: 50vw;
  }
  section div h2 {
    font-weight: bold;
    text-align: center;
    font-size: 3rem;
  }
  section div p {
    text-align: center;
    font-size: 2rem;
  }

  @media screen and (min-width: 1440px) {
    section {
      flex-direction: row;
    }
    section img {
      width: 420px;
      padding-right: 3rem;
    }
    section div h2 {
      font-size: 3rem;
      text-align: right;
    }
    section div p {
      font-size: 2.25rem;
      text-align: right;
    }
  }
</style>
