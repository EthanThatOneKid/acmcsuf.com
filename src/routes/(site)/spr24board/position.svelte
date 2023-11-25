<script lang="ts">
  import RecursiveUL from '$lib/components/recursive-ul/recursive-ul.svelte';
  import type { ClubPosition } from './position';
  import { TOOLS } from './data';

  export let data: ClubPosition<keyof typeof TOOLS>;

  const id = data.title.replaceAll(/\s/g, '-').toLowerCase();
  const formattedTools = data.tools.map((name) => ({
    html: `<span class="headers">${name}:</span> ${TOOLS[name]}`,
  }));
</script>

<details {id} style:--highlights={data.teamColor} class="position">
  <summary class="position__summary">
    <h2 class="headers">{data.title}</h2>
  </summary>

  <div class="position__body">
    <div class="position__qualifications">
      <h3 class="headers">Qualifications</h3>
      <RecursiveUL data={data.qualifications} />
    </div>

    <div class="position__requirements">
      {#if data.requirements}
        <h3 class="headers">Requirements</h3>
        <RecursiveUL data={data.requirements} />
      {/if}
    </div>

    <p class="position__tools">
      <span class="headers position__tools__title">Tools:</span>
      <span class="position__tools__text"
        >We used following tools to plan and keep up with the workload</span
      >
      <RecursiveUL data={formattedTools} />
    </p>

    <div class="position__responsibilities">
      <h3 class="headers">Responsibilities</h3>
      <RecursiveUL data={data.responsibilities} />
    </div>
  </div>
</details>

<style lang="scss">
  .position {
    scroll-padding-top: 1rem;
    margin: 1rem 0;
    box-shadow: 0 6px 18px rgba(var(--highlights, --acm-general-rgb), 0.25);
    transition: all 0.15s ease-in-out;
    border-radius: 30px;
    border: 2px solid var(--acm-dark);

    & :global(ul) {
      padding-left: 1.5rem;
      margin-left: 0;
    }

    &:hover {
      box-shadow: 0 6px 18px rgba(var(--highlights, --acm-general-rgb), 0.65);
    }

    &[open] {
      box-shadow: 0 6px 24px rgba(var(--highlights, --acm-general-rgb), 0.75);
      border: 2px solid rgb(var(--highlights, --acm-general-rgb));
    }

    &:hover h2,
    &[open] h2 {
      color: rgb(var(--highlights, --acm-general-rgb));
    }

    &__summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      cursor: pointer;

      /**
       * [START HACK] Remove the default marker from the <details> element.
       * @see https://stackoverflow.com/a/66814239
       * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#customizing_the_disclosure_widget
       */
      list-style: none;
      &::marker, /* Latest Chrome, Edge, Firefox */ 
      &::-webkit-details-marker /* Safari */ {
        display: none;
      }
      /* [END HACK] */
    }

    &__body {
      padding: 1rem;
    }

    &__requirements {
      margin-bottom: 1rem;
    }

    &__tools {
      margin-bottom: 1rem;

      &__title {
        margin-bottom: 1rem;
      }

      &__text {
        margin-bottom: 0.5rem;
      }
    }

    &__responsibilities {
      margin-bottom: 1rem;
    }
  }
</style>
