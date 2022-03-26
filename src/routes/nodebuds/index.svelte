<script lang="ts">
  import Spacing from '$lib/components/sections/spacing.svelte';
  import OfficerProfileList from '$lib/components/about/officer-profile-list.svelte';
  import { VISIBLE_TERMS } from '$lib/constants/officers';
  import type { Officer } from '$lib/constants/officers';
  import { termIndex } from '$lib/stores/term-index';

  function filterNodeBuddies(officer: Officer): boolean {
    const position = officer.positions[VISIBLE_TERMS[$termIndex]];
    if (position === undefined) {
      return false;
    }

    const isNodeBuddy = position.title.toUpperCase().includes('NODEBUDS');
    return isNodeBuddy;
  }
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<div class="container">
  <section>
    <div>
      <h2 class="headers size-lg">Personalized for your success</h2>

      <p class="size-sm">
        <span class="headers">Node Buds</span>
        is our exclusive program in partnership with
        <a href="/acm-w" class="headers w-text" target="_blank" rel="noopener noreferrer"> ACM-W</a>
        that exposes students to various opportunities that encourage connection, skill building, as
        well as both personal and technical development.

        <br /><br />

        Everone under this program will get paired with student-mentors, called
        <span class="brand-med">Buddies</span>, who will be there to help students prepare for their
        successful journeys through the tech industry.
      </p>
    </div>
    <img src="assets/badges/nodebuds.svg" alt="nodeBuds badge" />
  </section>
</div>

<Spacing --min="100px" --med="175px" --max="200px" />

<OfficerProfileList filter={filterNodeBuddies} />

<Spacing --min="40px" --med="95px" --max="120px" />

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    margin: 0 32px;
  }

  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1100px;
  }

  section img {
    margin-right: -32px;
    width: 350px;
    filter: drop-shadow(0 10px 40px rgba(212, 17, 83, 0.5));
    -webkit-filter: drop-shadow(0 10px 40px rgba(212, 17, 83, 0.5));
  }

  section div {
    max-width: 600px;
  }

  section h2 {
    padding-bottom: 16px;
  }

  .w-text {
    text-decoration: none;
    color: var(--acm-dark);
    transition: color 0.25s ease-in-out;
  }

  .w-text:hover {
    color: var(--acm-blue);
  }

  @media (max-width: 900px) {
    section {
      flex-direction: column-reverse;
      text-align: center;
    }

    section img {
      margin: 0;
      width: 175px;
      padding-bottom: 32px;
    }
  }
</style>
