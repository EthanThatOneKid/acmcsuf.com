<script lang="ts">
  import type { Officer } from '$lib/constants/officers';
  import { TIERS, VISIBLE_TERMS } from '$lib/constants';
  import { termIndex } from '$lib/stores/term-index';

  export let info: Officer;
  export let placeholderPicture = 'placeholder.webp';
  export let dev = false;

  const officerName = info.fullName ?? '';
  const officerPicture = info.picture ?? placeholderPicture;

  $: titleHTML = info.positions[VISIBLE_TERMS[$termIndex]].title
    .replace(/Algo\s/, `<b class="acm-purple">Algo&nbsp;</b>`)
    .replace(/Create\s/, `<b class="acm-pink">Create&nbsp;</b>`)
    .replace(/Design\s/, `<b class="acm-pink">Design&nbsp;</b>`)
    .replace(/Dev\s/, `<b class="acm-bluer">Dev&nbsp;</b>`)
    .replace(/AI\s/, `<b class="acm-emerald">AI&nbsp;</b>`)
    .replace(/nodebuds\s/, `<span class="brand-header">Node Buds&nbsp;</span>`);
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
