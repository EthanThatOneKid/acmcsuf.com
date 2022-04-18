<script lang="ts">
  import OfficerProfile from '$lib/components/about/officer-profile.svelte';
  import AcmSelect from '$lib/components/utils/acm-select.svelte';
  import { OFFICERS, VISIBLE_TERMS } from '$lib/constants/officers';
  import type { Officer } from '$lib/constants/officers';
  import { termIndex } from '$lib/stores/term-index';

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
  function sortByTier(termCode: string) {
    return (a: Officer, b: Officer) => {
      const aTier = a.positions[termCode].tier;
      const bTier = b.positions[termCode].tier;
      return aTier - bTier;
    };
  }

  // The process below is admittedly _hacky_. Due to a constraint with
  // the AcmSelect component, the index of the selected item must be
  // handled outside of the component. Below, we are updating the
  // termIndex when the AcmSelect component's value changes.
  const formattedTerms = VISIBLE_TERMS.map(formatTerm);
  let filteredOfficers = [];
  let currentFormattedTerm = formattedTerms[$termIndex];
  $: $termIndex = formattedTerms.indexOf(currentFormattedTerm);
  termIndex.subscribe(
    () => (filteredOfficers = OFFICERS.filter(filter).sort(sortByTier(VISIBLE_TERMS[$termIndex])))
  );
</script>

<section>
  <div class="container">
    <div class="button">
      <AcmSelect bind:defaultValue={currentFormattedTerm} options={formattedTerms} />
    </div>

    <div class="officer-list">
      {#each filteredOfficers as officer ($termIndex + officer.fullName)}
        <OfficerProfile info={officer} {placeholderPicture} />
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
    gap: 16px;

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
      }
    }
  }
</style>
