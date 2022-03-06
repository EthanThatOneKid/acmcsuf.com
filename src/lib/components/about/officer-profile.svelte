<script lang="ts">
  import { Officer, TIERS, VISIBLE_TERMS } from '$lib/constants';
  import { termIndex } from '$lib/stores/term-index';

  export let info: Officer;
  export let placeholderPicture = 'placeholder.png';
  export let dev = false;

  const officerName = info.fullName ?? '';
  const officerPicture = info.picture ?? placeholderPicture;

  $: titleHTML = info.positions[VISIBLE_TERMS[$termIndex]].title
    .replace(/Create/, `<span class="brand-em brand-pink">Create</span>`)
    .replace(/Algo/, `<span class="brand-em brand-purple">Algo</span>`)
    .replace(/Dev/, `<span class="brand-em brand-bluer">Dev</span>`)
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
    alt={`Image of ${officerName}.`} />
  <h3 class="headers">
    {officerName}
    {#if officerTier.length}<br />{officerTier}<br />{/if}
  </h3>
  <p>
    {@html titleHTML}
  </p>
</div>

<style lang="scss">
  @import 'static/theme.scss';

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
</style>
