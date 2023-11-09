<script lang="ts">
  import type { Team, Term } from '$lib/public/board';
  import { OFFICERS_JSON } from '$lib/public/board/data';
  import { getMembers } from '$lib/public/board';
  import OfficerProfile from '../../about/officer-profile.svelte';

  export let data: {
    term: Term;
    team: Team;
  };

  $: members = getMembers(OFFICERS_JSON, data.term, data.team.tiers);
</script>

<section class="team">
  <ul>
    {#each members as member (member.fullName + data.term)}
      <li>
        <OfficerProfile info={member} />
      </li>
    {/each}
  </ul>
</section>

<style>
  .team ul {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  @media screen and (min-width: 1000px) {
    section {
      display: grid;
      justify-self: center;
      align-items: center;
    }
    .team ul {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      width: 1064px;
    }
  }
</style>
