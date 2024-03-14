<script lang="ts">
  import AcmButton from '$lib/components/button/button.svelte';
</script>

<section class="hero-container">
  <div class="hero-inner-container">
    <div class="size-lg">
      <h1 class="hero-text">
        <span
          >Uncover your hidden passion in our curated
          <span class="acm-blue">Teams</span></span
        >
      </h1>
    </div>
    <div class="size-lg acm-heavy hero-text">
      <span>We made it easy to focus on what <span class="acm-sky">interests you.</span></span>
      <span>Explore the different <span class="acm-sky">teams</span> you can expect from us.</span>
    </div>

    <div class="team-row1-container">
      <!--Algo Header-->
      <div class="hero-inner-container">
        <img src="/assets/algo-logo.svg" alt="Algo Team Badge" />
        <div class="size-md acm-heavy hero-text">
          <span
            >Refine your knowledge of <span class="acm-purple">Algorithms</span> used for FAANG interviews</span
          >
        </div>
      </div>
      <!--Dev Header-->
      <div class="hero-inner-container">
        <img src="/assets/dev-logo.svg" alt="Dev Team Badge" />
        <div class="size-md acm-heavy hero-text">
          <span><span class="acm-bluer">Develop</span> semester-long projects to show your mom</span
          >
        </div>
      </div>
      <!--Design Header-->
      <div class="hero-inner-container">
        <img src="/assets/design-logo.svg" alt="Design Team Badge" />
        <div class="size-md acm-heavy hero-text">
          <span
            >Learn to <span class="acm-pink">Design</span> UI/UX and web development material</span
          >
        </div>
      </div>
    </div>

    <div class="team-row2-container">
      <!--AI Header-->
      <div class="hero-inner-container">
        <img src="/assets/ai-logo.svg" alt="AI Team Badge" />
        <div class="size-md acm-heavy hero-text">
          <span
            >Dive into the world of <span class="acm-emerald">Artificial Intelligence</span></span
          >
        </div>
      </div>
      <!-- Game Dev -->
      <div class="hero-inner-container">
        <img src="/assets/gamedev-logo.svg" alt="Game Dev Team Badge" />
        <div class="size-md acm-heavy hero-text">
          <span
            >Level up your game development skills at the <span class="acm-red">Game Dev</span> hub</span
          >
        </div>
      </div>
    </div>

    <div class="discover-button">
      <AcmButton text="Discover more" link="/teams" redirect={true} />
    </div>
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
    margin: 1em;
    max-width: 1064px;
    gap: 1em;
  }

  section .hero-inner-container .hero-text {
    display: grid;
    align-items: center;
    text-align: center;
  }

  section .hero-inner-container .hero-text span {
    text-align: center;
  }

  section .hero-inner-container .team-row2-container {
    justify-self: center;
  }

  section .hero-inner-container img {
    width: 200px;
    height: 200px;
    display: grid;
    justify-self: center;
  }

  section .hero-inner-container .discover-button {
    display: grid;
    justify-self: center;
  }

  @media screen and (min-width: 480px) {
    section {
      display: grid;
      place-items: center;
      align-items: center;
    }

    section .hero-inner-container {
      grid-template-columns: 1fr;
      gap: 2em;
      margin: 1em;
    }

    section .hero-inner-container .hero-text {
      text-align: start;
    }

    section .hero-inner-container .hero-text .discover-button {
      justify-self: center;
    }
  }

  @media screen and (min-width: 768px) {
    section .hero-inner-container .team-row1-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: baseline;
      gap: 2em;
    }

    section .hero-inner-container .team-row2-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: baseline;
      justify-content: center;
      width: 70ch;
      gap: 2em;
    }
  }
</style>
