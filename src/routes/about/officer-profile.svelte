<script lang="ts">
  import type { Officer } from '$lib/public/board/types';
  import GitHub from '$lib/components/svg/github.svelte';
  import LinkedIn from '$lib/components/svg/linkedin.svelte';
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
  const officerSocials = info.socials ?? {};

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

<div class="officer-3d-container">
  <div class="officer-container" class:officer-has-socials={info.socials !== undefined}>
    <div class="officer-front">
      <img
        class="officer-image"
        src={`../assets/authors/${officerPicture}`}
        alt={`Image of ${officerName}.`}
      />
      <div class="officer-placard">
        <h3 class="brand-header">
          {officerName}
          {#if officerTier}<br />{officerTier}<br />{/if}
        </h3>

        <p class="brand-med">
          {@html titleHTML}
        </p>
      </div>
    </div>
    <div class="officer-socials-frame">
      <div class="officer-socials">
        <h3>Socials</h3>
        {#if officerSocials.github}
          <p class="officer-github">
            <a target="blank" href="https://github.com/{officerSocials.github}">
              <GitHub />
              <span>{officerSocials.github}</span>
            </a>
          </p>
        {/if}
        {#if officerSocials.linkedin}
          <p class="officer-linkedin">
            <a target="blank" href="https://www.linkedin.com/in/{officerSocials.linkedin}">
              <LinkedIn />
              <span>{officerSocials.linkedin}</span>
            </a>
          </p>
        {/if}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .officer-container > .officer-front {
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

    /* Hide the arrow. We want to still use <details> for accessibility. */
    list-style: none;
    ::marker,
    ::-webkit-details-marker {
      display: none;
    }
  }

  /* Flip card bits. */
  .officer-3d-container {
    perspective: 2000px;

    &:hover > .officer-container.officer-has-socials {
      transform: rotateY(180deg);
    }

    .officer-container {
      position: relative;
      height: 250px;

      .officer-front,
      .officer-socials-frame {
        position: absolute;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }

      .officer-front {
        width: 100%;
        height: 100%;
      }

      &,
      .officer-socials-frame {
        transition: transform 0.3s ease;
        transform-style: preserve-3d;
      }

      .officer-socials-frame {
        width: 100%;
        height: 100%;
        transform: rotateY(180deg);

        display: flex;
        justify-content: center;

        .officer-socials {
          width: 250px;
          height: 100%;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: left;
          gap: 0.75em;

          padding: 16px 24px;
          border-radius: 20px;
          box-sizing: border-box;

          background-color: var(--acm-canvas);
        }

        & :global(svg) {
          width: 1.5em;
          height: 1.5em;
          margin-bottom: -0.35em;
          margin-right: 0.35em;
        }

        a {
          text-decoration: none;
          span {
            color: var(--acm-sky);
          }
        }

        /* Allow clicking on the background of the extra information to unflip. */
        pointer-events: none;
        a {
          pointer-events: auto;
        }
      }
    }
  }
</style>
