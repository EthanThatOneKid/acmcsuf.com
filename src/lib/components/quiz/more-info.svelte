<script lang="ts">
  import type { AcmPath } from '$lib/constants/acm-paths';

  export let teamMatch: AcmPath;
</script>

<section class="container" style={`--team-color: ${teamMatch.color}`}>
  {#if teamMatch.title === 'General'}
    <img src={teamMatch.picture} alt="img" />
    <h3>We are currently not accepting any board member applications...</h3>
    <h1>However</h1>
    <h3>This community is built on student’s knowledge that is not taught in class.</h3>
    <h3>
      If you have solid knowledge on things like Git, JavaScript, 3D Modeling please [do something],
      and we will get you a role on discord to display your understanding so others can reach you
      for help.
    </h3>
    <img src="./quiz/frank-js-emote.svg" alt="frank love" />
  {:else}
    <h1>{teamMatch.title} <span>TEAM</span></h1>
    <h3>{teamMatch.blurp}</h3>
    {#if teamMatch.title === 'AI'}
      <div>
        <h2>Stay Tuned for Events</h2>
        <img src={teamMatch.picture} alt="img" />
      </div>
    {:else}
      <h2>Previous Projects and Workshops</h2>
      <div class="image-layout">
        {#each teamMatch.workshopPictures as picture (picture)}
          <img src={picture} alt={picture} class="team-pictures" />
        {/each}
      </div>
    {/if}
    <h2>Get Started Now</h2>
    <h4>{teamMatch.blurpRecommend}</h4>
    <ul>
      {#each teamMatch.recommendations as recommendation (recommendation)}
        <li>{recommendation}</li>
      {/each}
    </ul>
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
    font-size: 64px;
    color: var(--team-color);
  }

  h2 {
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

  ul {
    list-style-type: none;
    font-style: italic;
    font-weight: 600;
  }
</style>
