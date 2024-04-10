<script lang="ts">
  import type { Team } from '$lib/public/board/types';
  import { OFFICERS_JSON } from '$lib/public/board/data';
  import { Term, getMembers } from '$lib/public/board';
  import DiamondPicture from './diamond-picture.svelte';
  import Members from './members.svelte';

  export let info: Team;
  export let term: Term;

  $: members = getMembers(OFFICERS_JSON, term, info?.tiers ?? []);

  const permanentTeamIDs = ['general', 'icpc', 'oss'];
  const oldTerms = [Term.Fall21, Term.Spring21, Term.Spring22];
  const nodebudsTerms = [...oldTerms];
  const gamedevTerms = [Term.Spring23, Term.Fall23, Term.Spring24];
  $: skip =
    (members.length === 0 && !permanentTeamIDs.includes(info?.id)) ||
    (info?.id === 'nodebuds' && !nodebudsTerms.includes(term)) ||
    (info?.id === 'gamedev' && !gamedevTerms.includes(term));
</script>

{#if !skip}
  <div class="team-section-container">
    <section
      id={info.id}
      class="team-section"
      class:marketing-animation={info.id === 'marketing'}
      class:algo-animation={info.id === 'algo'}
      class:design-animation={info.id === 'design'}
      class:dev-animation={info.id === 'dev'}
      class:ai-animation={info.id === 'ai'}
      class:oss-animation={info.id === 'oss'}
      class:nodebuds-animation={info.id === 'nodebuds'}
      class:icpc-animation={info.id === 'icpc'}
      class:special-events-animation={info.id === 'special-events'}
      class:gamedev-animation={info.id === 'gamedev'}
    >
      {#if info.id === 'general'}
        <DiamondPicture
          src="https://cdn.discordapp.com/icons/710225099923521558/a_f72bf9caa196d84a44ff40cdfd3f8d9a.gif?size=1024"
          reducedMotionSrc={info.logoSrc}
          altSrc="General Picture"
        />
      {:else}
        <img
          src={oldTerms.includes(term) ? info.oldLogoSrc ?? info.logoSrc : info.logoSrc}
          alt={`${info.title} Team Logo`}
        />
      {/if}

      <div class="team-description">
        <h2>
          <span class="acm-heavier size-lg acm-heaviest">
            <span style:--font-color={info.color} class="team-title">{info.title}</span>
            Team
          </span>
        </h2>
        <slot name="content" />
      </div>
    </section>

    <Members data={{ members, term, team: info }} />
  </div>
{/if}

<style>
  .team-section-container {
    display: grid;
    padding: 1rem 0;
  }

  .team-section {
    display: grid;
    grid-template-columns: 1fr;
    margin: 0 1rem;
    scroll-margin-top: 100px;
  }

  .team-section img {
    max-width: clamp(20rem, 17.342rem + 10.13vw, 30rem);
    justify-self: center;
  }

  .team-section .team-title {
    color: var(--font-color, var(--acm-dark));
  }

  .team-section .team-description {
    display: grid;
    align-items: center;
    text-align: center;
  }

  .marketing-animation img {
    animation-duration: 2s;
    animation-name: portrait-rotate;
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes portrait-rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(-90deg);
    }
  }

  .algo-animation img {
    animation-duration: 0.7s;
    animation-name: bounce;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes bounce {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-0.5rem);
    }
  }

  .design-animation img {
    animation-duration: 2.8s;
    animation-timing-function: cubic-bezier(0.425, 0.145, 0.515, 0.955);
    animation-name: flip;
    animation-iteration-count: infinite;
    animation-direction: normal;
  }

  @keyframes flip {
    from {
      transform: rotateX(0deg);
    }
    to {
      transform: rotateX(-360deg);
    }
  }

  .icpc-animation img {
    animation-duration: 3s;
    animation-timing-function: cubic-bezier(0.425, 0.145, 0.515, 0.955);
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-direction: normal;
  }

  @keyframes rotate {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(-360deg);
    }
  }

  .dev-animation img {
    animation-duration: 3s;
    animation-name: spin;
    animation-iteration-count: infinite;
    animation-direction: normal;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .ai-animation img {
    animation-duration: 1s;
    animation-name: tilt;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes tilt {
    from {
      transform: rotate(-30deg);
    }
    to {
      transform: rotate(30deg);
    }
  }

  .gamedev-animation img {
    --rumble: 5;
    animation-duration: 1s;
    animation-name: rumble;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes rumble {
    10% {
      transform: translate(calc(1px * var(--rumble)), calc(1px * var(--rumble)));
    }
    20% {
      transform: translate(calc(-1px * var(--rumble)), calc(-2px * var(--rumble)));
    }
    30% {
      transform: translate(calc(-3px * var(--rumble)), calc(0px * var(--rumble)));
    }
    40% {
      transform: translate(calc(3px * var(--rumble)), calc(2px * var(--rumble)));
    }
    50% {
      transform: translate(calc(1px * var(--rumble)), calc(-1px * var(--rumble)));
    }
    100% {
      transform: translate(0px, 0px);
    }
  }

  .oss-animation img {
    animation-duration: 0.42069s;
    animation-name: thrust;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes thrust {
    0% {
      transform: translate(1px, 1px) rotate(-10deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-8deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(-6deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(-4deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(-2deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(0deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(2deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(4deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(6deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(8deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(10deg);
    }
  }

  .special-events-animation img {
    animation-duration: 1.8s;
    animation-name: slide;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    position: relative;
  }

  .nodebuds-animation img {
    animation-duration: 1.8s;
    animation-name: slide;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    position: relative;
  }

  @keyframes slide {
    0% {
      left: -50px;
      top: 0px;
    }

    100% {
      left: 50px;
      top: 0px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    /* Stops team logo animations when reduced animation is on :) */
    .ai-animation img,
    .algo-animation img,
    .marketing-animation img,
    .design-animation img,
    .dev-animation img,
    .nodebuds-animation img,
    .icpc-animation img,
    .special-events-animation img,
    .oss-animation img {
      animation: none;
    }
  }

  @media screen and (min-width: 1000px) {
    .team-section {
      grid-template-columns: 1fr 2fr;
      justify-self: center;
      width: 1064px;
      gap: 2rem;
      margin: 0 32px;
    }

    .team-section img {
      margin-left: -32px;
      width: 350px;
    }

    .team-section .team-description {
      text-align: left;
    }

    .team-section .team-description h2 {
      align-self: end;
    }

    :nth-child(even) .team-section {
      grid-template-columns: 2fr 1fr;
    }

    :nth-child(even) .team-description {
      order: -1;
    }
  }
</style>
