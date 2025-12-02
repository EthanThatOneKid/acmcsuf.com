<script lang="ts">
  import { page } from '$app/stores';
  import type { semesters, teams } from '$lib/components/workshop/table';
  import WSDisplay from '$lib/components/workshop/wsdisplay.svelte';
  import Spacing from '$lib/public/legacy/spacing.svelte';

  let team = $page.params.team as teams;
  let semester = $page.params.semester as semesters;
</script>

<svelte:head>
  <title>Workshops | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<div id="workshops">
  <WSDisplay {team} sem={semester} />
</div>
