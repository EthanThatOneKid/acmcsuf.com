<script lang="ts">
  import type { Team, Term } from '$lib/public/board/types';
  import { TextAlignment } from '$lib/public/text-alignment/text-alignment';
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
      class:dev-animation={info.id === 'dev'}
    >
      <img src={info.logoSrc} alt={`${info.title} Team Logo`} />
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

  @media (prefers-reduced-motion: reduce) {
    .dev-animation img {
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
