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

<TeamSection
  info={TEAMS.marketing}
  textAlign={TextAlignment.RIGHT}
  term={VISIBLE_TERMS[$termIndex]}
>
  <p slot="content" class="size-md">
    The <span class="brand-blush brand-em">marketing</span> team has a strong passion towards
    advertising and spreading word on all our ACM events.
    <span class="brand-blush brand-em">Marketing</span> utilizes their expertise in digital strategies
    and creative storytelling to display a welcoming environment to all students.
  </p>
</TeamSection>

<!-- TODO: Algo -->

<!-- TODO: Design -->

<TeamSection info={TEAMS.dev} textAlign={TextAlignment.RIGHT} term={VISIBLE_TERMS[$termIndex]}>
  <p slot="content" class="size-md">
    The <span class="brand-bluer brand-em">development</span> team is dedicated to giving students
    the opportunity to explore tech via hands-on projects and activities.
    <span class="brand-bluer brand-em">Dev</span> focuses on introducing students to software development,
    and the various tech stacks used in the industry.
  </p>
</TeamSection>

<!-- TODO: AI -->

<!-- TODO: GameDev -->

<!-- TODO: Special Events -->

<!-- TODO: Nodebuds -->
<TeamSection info={TEAMS.nodebuds} textAlign={TextAlignment.RIGHT} term={VISIBLE_TERMS[$termIndex]}>
  <p slot="content" class="size-md">Personalized for your success, <span class="brand-red brand-em">node buds</span> is our exclusive program in 
    partnership with ACM-W that exposes students to various opportunities that encourage connection, skill building, 
    as well as both personal and technical development. Everone under this program will get paired with student-mentors, 
    called Buddies , who will be there to help students prepare for their successful journeys through the tech industry.
  </p>
</TeamSection>

<!-- TODO: ICPC? -->

<!-- TODO: Open Source Software? -->
<TeamSection info={TEAMS.oss} textAlign={TextAlignment.RIGHT} term={VISIBLE_TERMS[$termIndex]}>
  <p slot="content" class="size-md">
    The <span class="brand-turquoise brand-em">open source software</span> team is committed to
    fostering collaboration and innovation in the tech community.
    <span class="brand-turquoise brand-em">OSS</span> actively contributes to ACM open source projects,
    sharing their expertise and driving advancements in software development.
  </p>
</TeamSection>

<style>
  p {
    align-self: start;
  }
</style>
