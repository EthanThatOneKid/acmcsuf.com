<script lang="ts">
  import OfficerProfile from '$lib/components/about/officer-profile.svelte';
  import AcmSelect from '$lib/components/utils/acm-select.svelte';
  import { OFFICERS, TERMS } from '$lib/constants/officers';
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

  // The process below is admittedly _hacky_. Due to a constraint with
  // the AcmSelect component, the index of the selected item must be
  // handled outside of the component. Below, we are updating the
  // termIndex when the AcmSelect component's value changes.
  const formattedTerms = TERMS.map(formatTerm);
  let filteredOfficers = [];
  let currentFormattedTerm = formattedTerms[$termIndex];
  $: $termIndex = formattedTerms.indexOf(currentFormattedTerm);
  termIndex.subscribe(() => (filteredOfficers = OFFICERS.filter(filter)));
</script>

<section>
  <div class="school-year-input-container">
    <AcmSelect bind:defaultValue={currentFormattedTerm} options={formattedTerms} />
  </div>

  <div class="container">
    <div class="officer-profile-list">
      {#each filteredOfficers as { name, positions, picture } (`${name}-${$termIndex}`)}
        <OfficerProfile
          {name}
          title={positions[TERMS[$termIndex]]}
          {picture}
          {placeholderPicture} />
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  @import 'static/theme.scss';

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .school-year-input-container {
    text-align: center;
    z-index: 100;
  }

  .container {
    z-index: 1;
    margin-top: -64px;
    width: 100%;
    max-width: 1280px;
  }

  .officer-profile-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    justify-content: center;
    align-items: center;
  }
</style>
