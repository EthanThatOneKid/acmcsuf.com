<script lang="ts">
  import type { Team } from '$lib/public/board';
  import type { TeamReport } from '$lib/public/quiz/responses/data';

  export let team: Team;
  export let report: TeamReport;
</script>

<section class="container" style={`--team-color: ${team.color}`}>
  {#if team.title === 'General'}
    <img src={team.logoSrc} alt="img" />
    <h3>We are currently not accepting any board member applications...</h3>
    <h1 class="underline">However</h1>
    <p>
      This community is built on student’s knowledge that is not taught in class. When someone needs
      help in something you know, offer a hand. It's people like you that make our community
      stronger.
    </p>
    <img src="/assets/capy-lucky.png" alt="Chip the Capybara" />
  {:else}
    <h1>{team.title} <span>Team</span></h1>
    <p>{report.blurb}</p>
    <div class="image-layout">
      {#each report.workshopPictures as picture (picture)}
        <img src={picture} alt={picture} class="team-pictures" />
      {/each}
    </div>
    <h2>Get Started Now</h2>
    <h4>{report.blurbRecommend}</h4>
  {/if}
</section>

<style lang="scss">
  .container {
    --quiz-bg: rgba(102, 102, 102, 0.274);
    width: 450px;
    padding: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  h1 {
    font-size: 50px;
    color: var(--team-color);
  }

  h2,
  .underline {
    color: var(--team-color);
    position: relative;
  }

  h2::after {
    content: '';
    background-color: var(--team-color);
    position: absolute;
    right: 0;
    bottom: -5px;
    width: 100%;
    height: 4px;
    border-radius: 20px;
  }

  .underline::after {
    content: '';
    background-color: var(--team-color);
    position: absolute;
    right: 0;
    bottom: 5px;
    width: 100%;
    height: 6px;
    border-radius: 20px;
  }

  h4 {
    font-weight: 400;
  }

  span {
    color: var(--acm-dark);
  }

  .image-layout {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-items: center;
    align-content: center;
  }

  img {
    width: 100%;
  }

  .team-pictures {
    border-radius: 20px;
    border: var(--team-color) 3px solid;
  }

  @media screen and (max-width: 740px) {
    .container {
      width: 325px;
    }
    h1 {
      font-size: 48px;
    }
    h2 {
      font-size: 36px;
    }
  }
</style>
