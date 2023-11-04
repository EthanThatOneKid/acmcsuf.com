<script lang="ts">
  import { TEAMS_JSON } from '$lib/public/board/data';
  import { Term } from '$lib/public/board';
  import Team from './team.svelte';
  import Spacing from '$lib/public/legacy/spacing.svelte';

  const teamData = {
    team: TEAMS_JSON[0],
    term: Term.Spring23,
  };
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<Team data={teamData} />
