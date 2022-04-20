<script lang="ts">
  import Spacing from '$lib/components/sections/spacing.svelte';
  import AboutUs from '$lib/components/about/about-us.svelte';
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

<AboutUs />

<Spacing --min="120px" --med="150px" --max="200px" />

<h1 class="size-lg brand-header">Board members</h1>

<Spacing --min="16px" --med="16px" --max="16px" />

<OfficerProfileList filter={filterOfficers} placeholderPicture="placeholder.png" />

<Spacing --min="40px" --med="95px" --max="120px" />

<style>
  h1 {
    display: flex;
    justify-content: center;
  }
</style>
