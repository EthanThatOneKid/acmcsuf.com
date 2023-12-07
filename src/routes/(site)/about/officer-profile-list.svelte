<script lang="ts">
  import Select from '$lib/components/select/select.svelte';
  import type { Officer, Team, Term } from '$lib/public/board/types';
  import { OFFICERS_JSON } from '$lib/public/board/data';
  import { VISIBLE_TERMS } from '$lib/public/board/data/terms';
  import { termIndex, getTierByID } from '$lib/public/board/utils';
  import OfficerProfile from './officer-profile.svelte';

  export let team: Team | undefined = undefined;
  export let placeholderPicture: string | undefined = undefined;
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
   * @param termCode ex: `F21`, `S22`, etc.
   * @returns sort function for `Officer`s
   */
  function sortByTierInTeam(termCode: Term, team: Team) {
    return (a: Officer, b: Officer) => {
      const aPositions = a.positions[termCode];
      const bPositions = b.positions[termCode];
      if (!aPositions || !bPositions) {
        throw new Error(`a or b has no position`);
      }

      const aTierID = team.tiers
        ?.filter((tierID) => aPositions.findIndex((pos) => pos.tier === tierID) !== -1)
        .sort((a2, b2) => a2 - b2)[0];
      if (!aTierID) {
        throw new Error(`a has no tier`);
      }
      const aTier = getTierByID(aTierID);
      const bTierID = team.tiers
        ?.filter((tierID) => bPositions.findIndex((pos) => pos.tier === tierID) !== -1)
        .sort((a2, b2) => a2 - b2)[0];
      if (!bTierID) {
        throw new Error(`b has no tier`);
      }
      const bTier = getTierByID(bTierID);
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
      : [];
</script>

<section>
  <div class="container">
    <div class="button">
      <Select bind:defaultValue={currentFormattedTerm} options={formattedTerms} />
    </div>

    <div class="officer-list">
      {#each filteredOfficers as officer ($termIndex + officer.fullName)}
        <OfficerProfile info={officer} {team} {placeholderPicture} />
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
