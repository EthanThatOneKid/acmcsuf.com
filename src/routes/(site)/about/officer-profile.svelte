<script lang="ts">
  import type { Officer } from '$lib/public/board/types';
  import {
    termIndex,
    getOfficerTierByTermIndex,
    getPositionByTermIndex,
  } from '$lib/public/board/utils';

  export let info: Officer;
  export let placeholderPicture = 'placeholder.webp';
  export let dev = false;

  const officerName = info.fullName ?? '';
  const officerPicture = info.picture ?? placeholderPicture;

  $: titleHTML = getPositionByTermIndex(info, $termIndex)
    ?.title.replace(/Algo\s/, `<b class="acm-purple">Algo&nbsp;</b>`)
    .replace(/Create\s/, `<b class="acm-pink">Create&nbsp;</b>`)
    .replace(/Design\s/, `<b class="acm-pink">Design&nbsp;</b>`)
    .replace(/Dev\s/, `<b class="acm-bluer">Dev&nbsp;</b>`)
    .replace(/AI\s/, `<b class="acm-emerald">AI&nbsp;</b>`)
    .replace(/Marketing\s/, `<b class="acm-red">Marketing&nbsp;</b>`)
    .replace(/Special Events\s/, `<b class="acm-yellow">Special Events&nbsp;</b>`)
    .replace(/nodebuds\s/, `<span class="brand-header">Node Buds&nbsp;</span>`);

  $: officerTier = dev ? getOfficerTierByTermIndex(info, $termIndex) : '';
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
      {#if officerTier}<br />{officerTier}<br />{/if}
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
