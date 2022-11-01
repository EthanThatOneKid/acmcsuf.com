<script lang="ts">
  import { TextAlignment } from '$lib/public/text-alignment/text-alignment';
  import { TEAMS } from '$lib/public/board/data';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import Block from '$lib/components/block/block.svelte';
  import TeamSection from './team-section.svelte';
</script>

<svelte:head>
  <title>Teams | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<Block>
  <h1 slot="headline" class="size-xl">Meet the Teams</h1>
  <p slot="text" class="size-md">
    Teams are committees that specialize in specific fields in the tech industry. We’ve designed the
    teams to be gateways for students to explore new fields, develop new interests, and learn new
    skills that will benefit them in the industry.
  </p>
</Block>

<Spacing --min="100px" --med="175px" --max="200px" />

<TeamSection info={TEAMS.ai} textAlign={TextAlignment.RIGHT}>
  <p slot="content" class="size-md">
    This team is dedicated to providing accessible information about artificial intelligence and
    machine learning to all. <span class="brand-emerald brand-em">AI</span> focuses on fun projects geared
    towards beginners in the field.
  </p>
</TeamSection>

<Spacing --med="64px" />

<TeamSection info={TEAMS.algo} textAlign={TextAlignment.LEFT}>
  <p slot="content" class="size-md">
    This team is dedicated to building programming fundamentals within students.
    <span class="brand-purple brand-em">Algo</span> focuses on mastering data structures and algorithms,
    enhancing problem solving abilities, and exploration of competitive programming.
  </p>
</TeamSection>

<Spacing --med="64px" />

<TeamSection info={TEAMS.design} textAlign={TextAlignment.RIGHT}>
  <p slot="content" class="size-md">
    This team is dedicated to emphasizing the importance of product design and product management in
    the tech industry. <span class="brand-pink brand-em">Design</span> focuses on educating students
    about design principles, design tools, and the intricacies of conceptualization, development, and
    management of a product.
  </p>
</TeamSection>

<Spacing --med="64px" />

<TeamSection info={TEAMS.dev} textAlign={TextAlignment.LEFT}>
  <p slot="content" class="size-md">
    This team is dedicated to giving students the opportunity to explore tech via hands-on projects
    and activities. <span class="brand-em brand-bluer">Dev</span> focuses on introducing students to
    software development, and the various tech stacks used in the industry.
  </p>
</TeamSection>

<Spacing --min="40px" --med="95px" --max="120px" />
