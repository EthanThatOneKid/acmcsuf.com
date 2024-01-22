<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import type { Officer } from '$lib/public/board/types';
  import { VISIBLE_TERMS } from '$lib/public/board/data';
  import { termIndex } from '$lib/public/board/utils';
  import OfficerProfileList from '../about/officer-profile-list.svelte';

  function filterNodeBuddies(officer: Officer): boolean {
    const positions = officer.positions[VISIBLE_TERMS[$termIndex]];
    if (positions === undefined) {
      return false;
    }

    const isNodeBuddy = positions.some((pos) => pos.title.toUpperCase().includes('NODEBUDS'));
    return isNodeBuddy;
  }
</script>

<svelte:head>
  <title>Node Buds | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<div class="container">
  <section>
    <div>
      <h1 class="headers size-lg">Personalized for your success</h1>
      <p class="size-xs">
        <span class="headers"> node buds </span>
        is our exclusive program in partnership with
        <a href="/acm-w" class="headers w-text" target="_blank" rel="noopener noreferrer"> ACM-W</a>
        that exposes students to various opportunities that encourage connection, skill building, as
        well as both personal and technical development.
        <br /><br />
        Everyone under this program will get paired with student-mentors, called
        <span class="brand-med">Buddies</span>, who will be there to help students prepare for their
        successful journeys through the tech industry.
      </p>
    </div>
    <img src="assets/nodebuds-logo-old.svg" alt="nodeBuds badge" />
  </section>
</div>

<Spacing --min="100px" --med="175px" --max="200px" />

<div class="container">
  <h2 class="headers size-lg">Buddies</h2>
</div>

<Spacing --min="16px" --med="16px" --max="16px" />

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

  section h1 {
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
