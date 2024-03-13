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
  <title>Wave 2 board applications | ACM at CSUF</title>
</svelte:head>

<MetaTags
  openGraph={{
    title: 'Fall 2023 board applications',
    description:
      'Listed below are the positions that are open for the Fall 2023 semester. Please read the descriptions carefully and apply for the position(s) that you are interested in. You may apply for multiple positions, but you may only be selected for one. If you are selected for a position, you will be contacted by the current board member in charge of that position.',
    url: 'https://acmcsuf.com/wave2',
    type: 'article',
    article: {
      publishedTime: '2023-22-05T00:00:00.000Z',
      modifiedTime: '2023-22-05T00:00:00.000Z',
    },
  }}
/>

<Spacing --min="175px" --med="200px" --max="200px" />

<Block align={TextAlignment.LEFT}>
  <h1 slot="headline" class="size-lg">Wave 2 board applications</h1>
  <p slot="text" class="size-sm">
    Listed below are the positions that are open for the Fall 2023 semester (semester long
    position). Please read the descriptions carefully and apply for the position(s) that you are
    interested in. You may apply for multiple positions, but you may only be selected for one. If
    you are selected for a position, you will be contacted by the current board member in charge of
    that position.
    <br />
    <br />
    Last updated May 22nd, 2023
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
  <Button link="/wave2apply" text="Apply now!" />
</span>

<Spacing --med="64px" />

<Block align={TextAlignment.LEFT}>
  <h1 id="contact-information" slot="headline" class="size-lg">Contact information</h1>
  <div slot="text" class="contact-text">
    <p class="size-sm">
      <span class="brand-italic"
        >Feel free to contact the ACM Executive Board if you have questions.</span
      >
    </p>

    <p class="size-sm">
      <span class="acm-heaviest">Karnikaa Velumani (ACM President)</span>
    </p>
    <ul>
      <li>Email: <code>karnikaavelumani@csu.fullerton.edu</code></li>
      <li>Discord: <code>Karbas#0001</code></li>
    </ul>

    <p class="size-sm">
      <span class="acm-heaviest">Ethan Davidson (ACM VP / Webmaster)</span>
    </p>
    <ul>
      <li>Email: <code>ethandavidson@csu.fullerton.edu</code></li>
      <li>Discord: <code>EthanThatOneKid#3456</code></li>
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
