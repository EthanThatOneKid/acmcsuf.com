<script lang="ts">
  import Select from '$lib/components/select/select.svelte';
  import type { Position, Officer, Team, Term } from '$lib/public/board/types';
  import { OFFICERS_JSON } from '$lib/public/board/data';
  import { VISIBLE_TERMS } from '$lib/public/board/data/terms';
  import { termIndex, getTierByID } from '$lib/public/board/utils';
  import OfficerProfile from './officer-profile.svelte';

  export let team: Team | undefined = undefined;
  export let placeholderPicture: string | undefined = undefined;
  export let term: Term;
  export let filter: (officer: Officer) => boolean;

  /**
   * @param termCode ex: `F21`, `S22`, etc.
   * @returns `"Fall 2021"`, `"Spring 2022"`, etc.
   */
  function formatTerm(termCode: string) {
    const [termAbbr, yearDigit1, yearDigit2] = termCode.split('');
    const termText = termAbbr === 'S' ? 'Spring' : 'Fall';
    return `${termText} 20${yearDigit1}${yearDigit2}`;
  }

  /**
   * sortByTiers returns a sort function for `Officer`s that sorts by tiers.
   * @param termCode ex: `F21`, `S22`, etc.
   * @returns sort function for `Officer`s.
   */
  function sortByTiers(termCode: Term) {
    function sortByTier(p1: Position, p2: Position) {
      const p1Tier = getTierByID(p1.tier);
      const p2Tier = getTierByID(p2.tier);
      if (!p1Tier || !p2Tier) {
        throw new Error(`a or b has no tier`);
      }

      return p1Tier.index - p2Tier.index;
    }

    return (o1: Officer, o2: Officer) => {
      const o1Pos = [...(o1.positions[termCode] ?? [])].sort(sortByTier)?.[0];
      const o2Pos = [...(o2.positions[termCode] ?? [])].sort(sortByTier)?.[0];
      if (!o1Pos || !o2Pos) {
        throw new Error(`a or b has no position`);
      }

      return sortByTier(o1Pos, o2Pos);
    };
  }

  function sortByTierInTeam(termCode: Term, team: Team) {
    return (a: Officer, b: Officer) => {
      const aPositions = a.positions[termCode];
      const bPositions = b.positions[termCode];
      if (!aPositions || !bPositions) {
        throw new Error(`a or b has no positions for ${termCode}`);
      }

      // Get the lowest tier officer position in the team.
      const aTierID = team.tiers
        ?.filter((tierID) => aPositions.findIndex((pos) => pos.tier === tierID) !== -1)
        .sort((a2, b2) => a2 - b2)[0];
      if (!aTierID) {
        throw new Error(`a has no tier`);
      }
      const aTier = getTierByID(aTierID);

      // Get the lowest tier officer position in the team.
      const bTierID = team.tiers
        ?.filter((tierID) => bPositions.findIndex((pos) => pos.tier === tierID) !== -1)
        .sort((a2, b2) => a2 - b2)[0];
      if (!bTierID) {
        throw new Error(`b has no tier`);
      }
      const bTier = getTierByID(bTierID);

      // Sort by tier.
      if (!aTier || !bTier) {
        throw new Error(`a or b has no tier`);
      }

      return aTier.index - bTier.index;
    };
  }

  // The process below is admittedly _hacky_. Due to a constraint with
  // the AcmSelect component, the index of the selected item must be
  // handled outside of the component. Below, we are updating the
  // termIndex when the AcmSelect component's value changes.
  const formattedTerms = VISIBLE_TERMS.map(formatTerm);
  let currentFormattedTerm = formattedTerms[$termIndex];

  $: $termIndex = formattedTerms.indexOf(currentFormattedTerm);
  $: filteredOfficers =
    team !== undefined
      ? OFFICERS_JSON.filter(filter).sort(sortByTierInTeam(VISIBLE_TERMS[$termIndex], team))
      : OFFICERS_JSON.filter(filter).sort(sortByTiers(VISIBLE_TERMS[$termIndex]));
</script>

<section>
  <div class="container">
    <div class="button">
      <Select bind:defaultValue={currentFormattedTerm} options={formattedTerms} />
    </div>

    <div class="officer-list">
      {#each filteredOfficers as officer ($termIndex + officer.fullName)}
        <OfficerProfile info={officer} {team} {placeholderPicture} {term} />
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* More padding is added in .officer-container for the underline. */
    gap: 12px;

    .container {
      width: 100%;
      max-width: 1100px;

      .button {
        display: flex;
        justify-content: center;
      }

      .officer-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        justify-content: center;
        align-items: center;
        row-gap: 64px;
        margin-top: 13vh;
      }
    }
  }
</style>
