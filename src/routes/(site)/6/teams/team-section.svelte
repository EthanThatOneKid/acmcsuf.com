<script lang="ts">
  import type { Team, Term } from '$lib/public/board/types';
  import { TextAlignment } from '$lib/public/text-alignment/text-alignment';
  import DiamondPicture from './diamond-picture.svelte';
  import Members from './members.svelte';

  export let textAlign: TextAlignment = TextAlignment.RIGHT;
  export let info: Team | undefined;
  export let term: Term;
</script>

<div class="container">
  {#if info !== undefined}
    <section
      id={info.id}
      class:align-right={textAlign === TextAlignment.RIGHT}
      class:marketing-animation={info.id === 'marketing'}
      class:algo-animation={info.id === 'algo'}
      class:design-animation={info.id === 'design'}
      class:dev-animation={info.id === 'dev'}
      class:oss-animation={info.id === 'oss'}
    >
      {#if info.id === 'general'}
        <DiamondPicture
          src="https://cdn.discordapp.com/icons/710225099923521558/a_f72bf9caa196d84a44ff40cdfd3f8d9a.gif?size=1024"
          reducedMotionSrc={info.logoSrc}
          altSrc="General Picture"
        />
      {:else}
        <img src={info.logoSrc} alt={`${info.title} Team Logo`} />
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
    animation-duration: 1s;
    animation-name: pop-up;
    animation-iteration-count: 1;
    animation-direction: normal;
  }

  @keyframes pop-up {
    from {
      transform: translateX(110vh);
    }
    to {
      transform: translateX(0);
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

  .oss-animation img {
    animation-duration: 0.42069s;
    animation-name: tilt;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes tilt {
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

  @media (prefers-reduced-motion: reduce) {
    /* Stops team logo animations when reduced animation is on :) */
    .marketing-animation img,
    .design-animation img,
    .dev-animation img,
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
