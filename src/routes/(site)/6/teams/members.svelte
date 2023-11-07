<script lang="ts">
  import type { Team, Term } from '$lib/public/board';
  import { OFFICERS_JSON } from '$lib/public/board/data';
  import { getMembers } from '$lib/public/board';
  import OfficerProfile from '../../about/officer-profile.svelte';

  export let data: {
    term: Term;
    team: Team;
  };

  const members = getMembers(OFFICERS_JSON, data.term, data.team.tiers);
</script>

<section class="team">
  <h2>{data.team.title}</h2>
  <p>{data.team.description}</p>
  <ul>
    <!-- TODO: Fix each loop to show the correct officers per term. -->
    {#each members as member (member.fullName + data.term)}
      <li>
        <OfficerProfile info={member} />
      </li>
    {/each}
  </ul>
</section>
