<script lang="ts">
  import type { Officer, Term, Team } from '$lib/public/board';
  import OfficerProfile from '../../about/officer-profile.svelte';

  export let data: { members: Officer[]; term: Term; team: Team };
</script>

<section class="team">
  <ul>
    {#each data.members as member (member.fullName + data.term)}
      <li>
        <OfficerProfile info={member} team={data.team} />
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
      margin-bottom: 3rem;
    }
    .team ul {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      width: 1064px;
    }
  }
</style>
