<script lang="ts">
  import Spacing from '$lib/components/sections/spacing.svelte';
  import About from '$lib/components/about/about-us.svelte';
  import OfficerProfileList from '$lib/components/about/officer-profile-list.svelte';
  import { VISIBLE_TERMS } from '$lib/constants/officers';
  import type { Officer } from '$lib/constants/officers';
  import { termIndex } from '$lib//stores/term-index';
  
  function filterOfficers(officer: Officer): boolean {
    const isCurrentTerm = officer.positions[VISIBLE_TERMS[$termIndex]] !== undefined;
    return isCurrentTerm;
  }
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<About />

<Spacing --min="120px" --med="150px" --max="200px" />

<Spacing --min="16px" --med="16px" --max="16px" />

<OfficerProfileList filter={filterOfficers} placeholderPicture="placeholder.png" />

<Spacing --min="40px" --med="95px" --max="120px" />
