<script lang="ts">
  import Block from '$lib/components/block/block.svelte';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import Button from '$lib/components/button/button.svelte';

  import PositionList from './position-list.svelte';
  import { POSITIONS } from './data';
  import { TextAlignment } from '$lib/public/legacy/text-alignment';
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<Block>
  <h1 slot="headline" class="size-lg">Spring 2023 board applications</h1>
  <p slot="text" class="size-sm">
    Listed below are the positions that are open for the Spring 2023 semester. Please read the
    descriptions carefully and apply for the position(s) that you are interested in. You may apply
    for multiple positions, but you may only be selected for one. If you are selected for a
    position, you will be contacted by the current board member in charge of that position.
    <br />
    <br />
    Last updated January 16th, 2023
    <br />
    <br />
    <span class="apply-btn">
      <Button link="/s23apply" text="Apply now!" />
    </span>
  </p>
</Block>

<Spacing --min="175px" --med="200px" --max="200px" />

<Block align={TextAlignment.LEFT}>
  <h1 id="spring-2023-board-applications" slot="headline" class="size-lg">
    Spring 2023 board applications
  </h1>
  <div slot="text" />
</Block>

<section class="positions-container">
  <PositionList data={POSITIONS} />
</section>

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
      <span class="brand-em">Karnikaa Velumani (ACM President)</span>
    </p>
    <ul>
      <li>Email: <code>karnikaavelumani@csu.fullerton.edu</code></li>
      <li>Discord: <code>Karbas#0001</code></li>
    </ul>

    <p>
      <span class="brand-em">Ethan Davidson (ACM VP / Webmaster)</span>
    </p>
    <ul>
      <li>Email: <code>ethandavidson@csu.fullerton.edu</code></li>
      <li>Discord: <code>EthanThatOneKid#3456</code></li>
    </ul>
  </div>
</Block>

<Spacing --min="40px" --med="95px" --max="120px" />

<style lang="scss">
  .page-body {
    width: 100%;
    margin: 0 1rem;
  }

  .apply-btn {
    display: flex;
    justify-content: center;
  }

  .contact-text ul {
    padding: 0 0 0 1rem;
  }

  .positions-container {
    max-width: 100%;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .positions-container {
      max-width: 64ch;
      margin: 0 1rem;
    }
  }
</style>
