<script lang="ts">
  import AcmButton from '$lib/components/button/button.svelte';
</script>

<section class="hero-container">
  <div class="hero-inner-container">
    <div class="size-lg">
      <h1 class="hero-text">
        <span
          ><i>Uncover</i> your hidden passion in our curated
          <span class="acm-blue">Teams</span></span
        >
      </h1>
    </div>
    <div class="size-lg brand-med hero-text">
      <span>We made it easy to focus on what <span class="acm-sky">interests you.</span></span>
      <span>Explore the different <span class="acm-sky">teams</span> you can expect from us.</span>
    </div>
    <div class="team-row1-container">
      <!--Algo Header-->
      <div class="hero-inner-container">
        <img src="/assets/badges/algo-badge.svg" alt="Algo Team Badge" />
        <div class="size-md brand-med hero-text">
          <span
            >Refine your knowledge of <span class="acm-purple">Algorithms</span> used for FAANG interviews</span
          >
        </div>
      </div>

      <!--Dev Header-->
      <div class="hero-inner-container">
        <img src="/assets/badges/dev-badge.svg" alt="Dev Team Badge" />
        <div class="size-md brand-med hero-text">
          <span><span class="acm-bluer">Develop</span> semester long projects to show your mom</span
          >
        </div>
      </div>

      <!--Design Header-->
      <div class="hero-inner-container">
        <img src="/assets/badges/design-badge.svg" alt="Design Team Badge" />
        <div class="size-md brand-med hero-text">
          <span
            >Learn to <span class="acm-pink">Design</span> UI/UX and web development material</span
          >
        </div>
      </div>
    </div>
    <div class="team-row2-container">
      <!--AI Header-->
      <div class="hero-inner-container">
        <img src="/assets/badges/ai-badge.svg" alt="AI Team Badge" />
        <div class="size-md brand-med hero-text">
          <span
            >Expose yourself to the new world of <span class="acm-emerald"
              >Artificial Intelligence</span
            ></span
          >
        </div>
      </div>
      <!-- Game Dev -->
      <div class="hero-inner-container">
        <img src="/assets/badges/gamedev-badge.svg" alt="Game Dev Team Badge" />
        <div class="size-md brand-med hero-text">
          <span
            >Visit the <span class="acm-red">Foundry</span> and hone your game development skills</span
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
    gap: 3em;
    max-width: 1064px;
  }

  section .hero-inner-container .hero-text {
    display: grid;
    align-items: center;
    text-align: center;
  }

  section .hero-inner-container .hero-text span {
    text-align: center;
  }

  section .hero-inner-container img {
    width: 90%;
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

    section .hero-inner-container .team-row1-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
      gap: 2em;
    }

    section .hero-inner-container .team-row2-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 2em;
    }

    section .hero-inner-container .hero-text {
      text-align: start;
    }

    section .hero-inner-container .hero-text .discover-button {
      justify-self: center;
    }
  }
</style>
