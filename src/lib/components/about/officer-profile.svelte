<script lang="ts">
  import type { Officer } from '$lib/constants/officers';
  import { TIERS, VISIBLE_TERMS } from '$lib/constants';
  import { termIndex } from '$lib/stores/term-index';

  export let info: Officer;
  export let placeholderPicture = 'placeholder.png';
  export let dev = false;

  const officerName = info.fullName ?? '';
  const officerPicture = info.picture ?? placeholderPicture;

  $: titleHTML = info.positions[VISIBLE_TERMS[$termIndex]].title
    .replace(/Algo\s/, `<span class="brand-bold acm-purple">Algo&nbsp</span>`)
    .replace(/Create\s/, `<span class="brand-bold acm-pink">Create&nbsp</span>`)
    .replace(/Dev\s/, `<span class="brand-bold acm-bluer">Dev&nbsp</span>`)
    .replace(/AI\s/, `<span class="brand-bold acm-emerald">AI&nbsp</span>`)
    .replace(/nodebuds\s/, `<span class="brand-header">Node Buds&nbsp</span>`);

  $: officerTier = dev ? TIERS[info.positions[VISIBLE_TERMS[$termIndex]].tier] : '';
</script>

<div class="officer-container">
  <img
    class="officer-image"
    src={`../assets/authors/${officerPicture}`}
    alt={`Image of ${officerName}.`}
  />

  <div>
    <h3 class="brand-header">
      {officerName}
      {#if officerTier.length}<br />{officerTier}<br />{/if}
    </h3>

    <p class="brand-med">
      {@html titleHTML}
    </p>
  </div>
</div>

<!-- <script lang="ts">
  import type { Officer } from '$lib/constants/officers';
  import { TIERS, VISIBLE_TERMS } from '$lib/constants';
  import { termIndex } from '$lib/stores/term-index';

  export let info: Officer;
  export let placeholderPicture = 'placeholder.png';
  export let dev = false;

  const officerName = info.fullName ?? '';
  const officerPicture = info.picture ?? placeholderPicture;

  $: titleHTML = info.positions[VISIBLE_TERMS[$termIndex]].title
    .replace(/Create\s/, `<span class="brand-em brand-pink">Create </span>`)
    .replace(/Algo\s/, `<span class="brand-em brand-purple">Algo </span>`)
    .replace(/Dev\s/, `<span class="brand-em brand-bluer">Dev </span>`)
    .replace(
      /NodeBuds/,
      `<span class="headers">node<span class="brand-em brand-red">Buds</span></span>`
    );

  $: officerTier = dev ? TIERS[info.positions[VISIBLE_TERMS[$termIndex]].tier] : '';
</script>

<div class="officer-container">
  <img
    class="officer-image"
    src={`../assets/authors/${officerPicture}`}
    alt={`Image of ${officerName}.`}
  />
  <h3 class="headers">
    {officerName}
    {#if officerTier.length}<br />{officerTier}<br />{/if}
  </h3>
  <p>
    {@html titleHTML}
  </p>
</div>

<style lang="scss">
  .officer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 64px 64px 0;
    text-align: center;
  }

  .officer-image {
    width: 200px;
    height: 200px;
  }

  h3 {
    color: var(--acm-dark);
  }

  p {
    font-weight: 500;
    max-width: 250px;
    color: var(--acm-dark);
  }
</style> -->
<style lang="scss">
  .officer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .officer-image {
      width: 200px;
      height: auto;
    }

    p {
      max-width: 250px;
    }
  }
</style>
