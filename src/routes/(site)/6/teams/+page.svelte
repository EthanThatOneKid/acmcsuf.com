<script lang="ts">
  import { TEAMS } from '$lib/public/board/data';
  import { VISIBLE_TERMS } from '$lib/public/board/data/terms';
  import { termIndex } from '$lib/public/board/utils';
  import { TextAlignment } from '$lib/public/text-alignment/text-alignment';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import TeamSection from './team-section.svelte';
  import Select from '$lib/components/select/select.svelte';

  /**
   * @param termCode ex: `F21`, `S22`, etc.
   * @returns `"Fall 2021"`, `"Spring 2022"`, etc.
   */
  function formatTerm(termCode: string) {
    const [termAbbr, yearDigit1, yearDigit2] = termCode.split('');
    const termText = termAbbr === 'S' ? 'Spring' : 'Fall';
    return `${termText} 20${yearDigit1}${yearDigit2}`;
  }

  const formattedTerms = VISIBLE_TERMS.map(formatTerm);
  let currentFormattedTerm = formattedTerms[$termIndex];
  $: $termIndex = formattedTerms.indexOf(currentFormattedTerm);
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<Select bind:defaultValue={currentFormattedTerm} options={formattedTerms} />

<TeamSection info={TEAMS.general} textAlign={TextAlignment.RIGHT} term={VISIBLE_TERMS[$termIndex]}>
  <p slot="content" class="size-md">
    The ACM <span class="brand-blue brand-em">general</span> team is a dynamic group of individuals
    driving the success of our organization. ACM <span class="brand-blue brand-em">General</span>
    manages operations, organizes events, and ensure the smooth functioning of ACM. They are the backbone
    of our community, fostering collaboration and innovation among members.
  </p>
</TeamSection>

<!-- TODO: Marketing -->

<TeamSection info={TEAMS.algo} textAlign={TextAlignment.RIGHT} term={VISIBLE_TERMS[$termIndex]}>
  <p slot="content" class="size-md">
    The <span class="brand-purple brand-em">algorithm</span> team is dedicated to building
    programming fundamentals within students. <span class="brand-purple brand-em">Algo</span> focuses
    on mastering data structures and algorithms, enhancing problem solving abilities, and exploration
    of competitive programming.
  </p>
</TeamSection>

<!-- TODO: Design -->

<!-- TODO: Dev -->

<!-- TODO: AI -->

<!-- TODO: GameDev -->

<!-- TODO: Special Events -->

<!-- TODO: Nodebuds -->

<!-- TODO: ICPC? -->

<!-- TODO: Open Source Software? -->

<style>
  p {
    align-self: start;
  }
</style>
