<script lang="ts">
  import { acmAlgo, acmCreate, acmDev } from '$lib/constants/acm-paths';
  import { TextAlignment } from '$lib/constants/text-alignment';
  import CommonHero from '$lib/components/sections/common-hero.svelte';
  import PathSection from '$lib/components/paths/path-section.svelte';
  import Spacing from '$lib/components/sections/spacing.svelte';
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<CommonHero>
  <h2 slot="headline" class="size-lg">What are paths?</h2>
  <p slot="text" class="size-xs">
    Paths are committees that specialize in specific fields in the tech industry. We’ve designed
    paths to be gateways for students to explore new fields, develop new interests, and enhance
    skills that’ll benefit in the industry.
  </p>
</CommonHero>

<Spacing --min="100px" --med="175px" --max="200px" />

<PathSection info={acmAlgo} textAlign={TextAlignment.Right}>
  <p slot="content" class="size-xs">
    This path is dedicated to building the programming proficiency of students.
    <span class="brand-purple brand-em">Algo</span> focuses on mastering data structures and algorithms,
    enhancing problem solving abilities, and exploration of competitive programming.
  </p>
</PathSection>

<Spacing --med="64px" />

<PathSection info={acmCreate} textAlign={TextAlignment.Left}>
  <p slot="content" class="size-xs">
    This path is dedicated to emphasizing the importance of product design and product management in
    the tech industry. <span class="brand-pink brand-em">Create</span> focuses on educating students
    about design principles, design tools, and the intricacies of conceptualization, development, and
    management of a product.
  </p>
</PathSection>

<Spacing --med="64px" />

<PathSection info={acmDev} textAlign={TextAlignment.Right}>
  <p slot="content" class="size-xs">
    This path is dedicated to giving students the opportunity to explore tech via hands-on projects
    and activities. <span class="brand-em brand-bluer">Dev</span> focuses on introducing students to
    software development, and the various tech stacks used in the industry.
  </p>
</PathSection>

<Spacing --min="40px" --med="95px" --max="120px" />

<style lang="scss">
  @import 'node_modules/rfs/scss';

  .size-xs {
    @include font-size(var(--size-xs));
  }

  .size-lg {
    @include font-size(var(--size-lg));
  }
</style>
