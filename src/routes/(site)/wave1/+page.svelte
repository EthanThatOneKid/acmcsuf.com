<script lang="ts">
  import { onMount } from 'svelte';
  import { MetaTags } from 'svelte-meta-tags';
  import Block from '$lib/components/block/block.svelte';
  import Button from '$lib/components/button/button.svelte';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import { TextAlignment } from '$lib/public/text-alignment/text-alignment';
  import PositionList from './position-list.svelte';
  import { POSITIONS } from './data';

  /**
   * positions is the list of position elements.
   */
  let positions: HTMLDialogElement[] | null = null;

  /**
   * expanded is true when every position is open.
   */
  let expanded = false;

  /**
   * checkExpanded tests whether a set of positions are expanded.
   */
  function checkExpanded() {
    expanded = positions !== null && positions.every((el) => el.hasAttribute('open'));
  }

  /**
   * action is done each time the user clicks the primary button.
   */
  function action() {
    if (positions === null) {
      return;
    }

    // Defers checkExpanded for after this function is called,
    // no matter the path this function continues to take.
    setTimeout(checkExpanded);

    if (expanded) {
      positions.forEach((el) => el.removeAttribute('open'));
      return;
    }

    positions.forEach((el) => el.setAttribute('open', 'true'));
  }

  onMount(() => {
    positions = [...document.querySelectorAll<HTMLDialogElement>('.position')];
  });
</script>

<svelte:head>
  <title>Fall 25 Executive Board Positions | ACM at CSUF</title>
</svelte:head>

<MetaTags
  openGraph={{
    title: 'Fall 2025 Executive Board Applications',
    description:
      'Listed below are the positions that are open for the Fall 2025 semester. Please read the descriptions carefully and apply for the position(s) that you are interested in. You may apply for multiple positions, but you may only be selected for one. If you are selected for a position, you will be contacted by the current board member in charge of that position.',
    url: 'https://acmcsuf.com/wave1',
    type: 'article',
    article: {
      publishedTime: '2025-26-04T00:00:00.000Z',
      modifiedTime: '2025-26-04T00:00:00.000Z',
    },
  }}
/>

<Spacing --min="175px" --med="200px" --max="200px" />

<Block align={TextAlignment.LEFT}>
  <h1 slot="headline" class="size-lg">Fall 25 Executive Board Positions</h1>
  <p slot="text" class="size-sm">
    Listed below are the positions that are open for 25'/26' Executive Board positions. Please read
    the descriptions carefully and apply for the position(s) that you are interested in. You may
    apply for multiple positions, but you may only be selected for one. If you are selected for a
    position, you will be contacted by the current team lead in charge of that position.
    <br />
    <br />
    <span class="center-btn" on:click={action} on:keypress={action} role="button" tabindex="0">
      <Button text={`${expanded ? 'Close all.' : 'Expand All!'}`} />
    </span>
  </p>
</Block>

<section class="positions-container">
  <div
    class="positions-container-inner"
    on:click={() => setTimeout(checkExpanded)}
    on:keypress={() => setTimeout(checkExpanded)}
    role="button"
    tabindex="0"
  >
    <PositionList data={POSITIONS} />
  </div>
</section>

<Spacing --med="64px" />

<span class="center-btn">
  <Button link="https://forms.gle/e4b9ADzgcEyU6HyK7" text="Apply now!" />
</span>

<Spacing --med="64px" />

<Block align={TextAlignment.LEFT}>
  <h1 id="contact-information" slot="headline" class="size-lg">Contact information</h1>
  <div slot="text" class="contact-text">
    <p class="size-sm">
      <span class="acm-italic"
        >Feel free to contact the ACM Executive Board if you have questions.</span
      >
    </p>

    <p class="size-sm">
      <span class="acm-heaviest">Mark Garcia (ACM President)</span>
    </p>
    <ul>
      <li>Discord: <code>markgdev</code></li>
    </ul>

    <p class="size-sm">
      <span class="acm-heaviest">Max Rivas (ACM VP)</span>
    </p>
    <ul>
      <li>Discord: <code>meexy23</code></li>
    </ul>
  </div>
</Block>

<Spacing --min="40px" --med="95px" --max="120px" />

<style lang="scss">
  .center-btn {
    display: flex;
    justify-content: center;
  }

  .contact-text ul {
    padding: 0 0 0 1rem;
  }

  .positions-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .positions-container-inner {
    margin: 0 24px;
    width: 100%;
    margin: 2rem 2rem 0;
  }

  @media (min-width: 768px) {
    .positions-container {
      margin-top: 2rem;
    }

    .positions-container-inner {
      max-width: 64ch;
      margin: 0 1rem;
    }
  }
</style>
