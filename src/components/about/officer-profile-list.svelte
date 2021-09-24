<script lang="ts">
  import { OFFICERS, TERMS } from "../../lib/officers";
  import OfficerProfile from "@/components/about/officer-profile.svelte";
  import AcmSelect from "@/components/utils/acm-select.svelte";

  export let officers: any[] = OFFICERS;
  export let placeholderPicture: string;

  const formatTerm = (termCode: string) => {
    const [termAbbr, yearDigit1, yearDigit2] = termCode.split("");
    const termText = termAbbr === "S" ? "Spring" : "Fall";
    return `${termText} 20${yearDigit1}${yearDigit2}`;
  };

  const formattedTerms = TERMS.map(formatTerm);
  let currentTermIndex = 0;
  let currentFormattedTerm = formattedTerms[currentTermIndex];
  $: currentTermIndex = formattedTerms.indexOf(currentFormattedTerm);
  $: filteredOfficers = officers.filter(({ positions }) =>
    positions.hasOwnProperty(TERMS[currentTermIndex])
  );
</script>

<section>
  <div class="school-year-input-container">
    <AcmSelect
      bind:defaultValue="{currentFormattedTerm}"
      options="{formattedTerms}"
    />
  </div>

  <div class="container">
    <div class="officer-profile-list">
      {#each filteredOfficers as { name, positions, picture } (`${name}-${currentTermIndex}`)}
        <OfficerProfile
          name="{name}"
          title="{positions[TERMS[currentTermIndex]]}"
          picture="{picture}"
          placeholderPicture="{placeholderPicture}"
        />
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  @import "static/theme.scss";

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  section h2 {
    text-align: center;
    font-weight: 700;
  }

  .school-year-input-container {
    text-align: center;
  }

  .officer-profile-list {
    display: flex;
    flex-flow: row wrap;
    max-width: 1400px;
    justify-content: space-evenly;
  }
</style>
