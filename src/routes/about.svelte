<script lang="ts">
  import CommonHero from '$lib/components/sections/common-hero.svelte';
  import OfficerProfileList from '$lib/components/about/officer-profile-list.svelte';
  import Spacing from '$lib/components/sections/spacing.svelte';
  import Header from '$lib/components/about/what-is-acm.svelte';
  import { TERMS } from '$lib//constants/officers';
  import type { Officer } from '$lib//constants/officers';
  import { termIndex } from '$lib//stores/term-index';

  function filterOfficers(officer: Officer): boolean {
    const isCurrentTerm = officer.positions[TERMS[$termIndex]] !== undefined;
    return isCurrentTerm;
  }
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<Header />

<Spacing --min="32px" --max="64px" />

<CommonHero>
  <h2 slot="headline" class="size-l">Who are we?</h2>
  <p slot="text" class="size-xs">
    acmCSUF is a student chapter of the
    <a href="https://acm.org" class="brand-med" target="_blank" rel="noopener noreferrer">
      Association for Computing Machinery</a
    >, an international organization based in New York that advocates for the advancement of
    computer science as a science and profession. Our chapter based in California State University,
    Fullerton focuses on bringing passionate Titans together to be involved in the tech community
    via workshops, info sessions, community events, and more!
  </p>
</CommonHero>

<Spacing --min="120px" --med="150px" --max="200px" />

<div class="container">
  <h2 class="headers size-l">Board members</h2>
</div>

<Spacing --min="16px" --med="16px" --max="16px" />

<OfficerProfileList filter={filterOfficers} placeholderPicture="placeholder.png" />

<Spacing --min="40px" --med="95px" --max="120px" />

<style lang="scss">
  @import 'static/theme.scss';

  a {
    text-decoration: none;
    transition: 0.25s ease-in-out;

    &:hover {
      color: var(--acm-blue);
    }
  }

  .container {
    display: flex;
    justify-content: center;
  }
</style>
