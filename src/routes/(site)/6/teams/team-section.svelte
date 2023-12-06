<script lang="ts">
  import type { Team } from '$lib/public/board/types';
  import { Term } from '$lib/public/board/types';
  import { TextAlignment } from '$lib/public/text-alignment/text-alignment';
  import DiamondPicture from './diamond-picture.svelte';
  import Members from './members.svelte';

  export let textAlign: TextAlignment = TextAlignment.RIGHT;
  export let info: Team | undefined;
  export let term: Term;

  const oldTerms = [Term.Fall21, Term.Spring21, Term.Spring22];
  const nodebudsTerms = [Term.Fall21, Term.Spring21, Term.Spring22];
  const gamedevTerms = [Term.Fall23, Term.Spring23];
  $: skip =
    (info?.id === 'nodebuds' && !nodebudsTerms.includes(term)) ||
    (info?.id === 'gamedev' && !gamedevTerms.includes(term));
</script>

{#if !skip}
  <div class="container">
    {#if info !== undefined}
      <section
        id={info.id}
        class:align-right={textAlign === TextAlignment.RIGHT}
        class:marketing-animation={info.id === 'marketing'}
        class:algo-animation={info.id === 'algo'}
        class:design-animation={info.id === 'design'}
        class:dev-animation={info.id === 'dev'}
        class:ai-animation={info.id === 'ai'}
        class:oss-animation={info.id === 'oss'}
        class:nodebuds-animation={info.id === 'nodebuds'}
        class:icpc-animation={info.id === 'icpc'}
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
            <span class="headers size-lg">
              <span style:--font-color={info.color}>
                <span class="brand-em">{info.title}</span>
              </span>
              <span class="brand-em">Team</span>
            </span>
          </h2>
          <slot name="content" />
        </div>
      </section>
      <Members data={{ term, team: info }} />
    {/if}
  </div>
{/if}

<style>
  .container {
    display: grid;
  }

  section {
    display: grid;
    grid-template-columns: 1fr;
    margin: 0 1rem;
  }

  section img {
    max-width: clamp(20rem, 17.342rem + 10.13vw, 30rem);
    justify-self: center;
  }

  section .team-description {
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

  .nodebuds-animation img {
    animation-duration: 1.8s;
    animation-name: slide;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    position: relative;
  }

  @keyframes slide {
    0% {
      left: -60px;
      top: 0px;
    }

    100% {
      left: 15px;
      top: 0px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    /* Stops team logo animations when reduced animation is on :) */
    .ai-animation img,
    .marketing-animation img,
    .design-animation img,
    .dev-animation img,
    .nodebuds-animation img,
    .oss-animation img {
      animation: none;
    }
  }

  @media screen and (min-width: 1000px) {
    section {
      grid-template-columns: 1fr 2fr;
      justify-self: center;
      width: 1064px;
      gap: 2rem;
      margin: 0 32px;
    }

    section img {
      margin-left: -32px;
      width: 350px;
    }

    section .team-description {
      text-align: left;
    }

    section .team-description h2 {
      align-self: end;
    }

    :nth-child(even) section {
      grid-template-columns: 2fr 1fr;
    }
    :nth-child(even) .team-description {
      order: -1;
    }
  }
</style>
