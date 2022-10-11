<script lang="ts">
  import type { Officer } from '$lib/public/board/types';
  import { Term } from '$lib/public/board/types';
  import GitHub from '$lib/components/svg/github.svelte';
  import Public from '$lib/components/svg/public.svelte';
  import Discord from '$lib/components/svg/discord.svelte';
  import LinkedIn from '$lib/components/svg/linkedin.svelte';
  import Instagram from '$lib/components/svg/instagram.svelte';
  import { toast } from '$lib/components/toaster/toasts';
  import { onMount } from 'svelte';
  import {
    termIndex,
    getOfficerTierByTermIndex,
    getPositionByTermIndex,
  } from '$lib/public/board/utils';

  export let info: Officer;
  export let placeholderPicture = 'placeholder.webp';
  export let dev = false;
  export let hasBuggyAnimations = false;

  // earliestTerm returns the earliest term of the current officer. Blame Ethan
  // for this whole idea of having an officer ID. OK, maybe some of it was mine.
  function earliestTerm(): string {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, key] of Object.entries(Term)) {
      if (info.positions[key]) {
        return key;
      }
    }
    return 'null';
  }

  const officerID = info.fullName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + earliestTerm();
  const officerName = info.fullName ?? '';
  const officerPicture = info.picture ?? placeholderPicture;
  const officerSocials = info.socials ?? {};
  $: officerPosition = getPositionByTermIndex(info, $termIndex)?.title || '';

  /** @see <https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText> */
  function copyDiscord() {
    toast(async () => {
      try {
        await navigator.clipboard.writeText(officerSocials.discord || '');
        return `Copied ${officerName}'s Discord tag to clipboard!`;
      } catch (err) {
        console.error(err);
        throw `Error occured while copy Discord tag to clipboard.`;
      }
    });
  }

  onMount(() => {
    if (navigator.userAgent.match(/Safari/) && !navigator.userAgent.match(/Chrome/)) {
      // Explicitly reduce the flipcard animation on Safari due to how buggy it
      // is. Refer to .has-buggy-animation.
      hasBuggyAnimations = true;
    }
  });

  // teamClasses maps team names to CSS class names. We call Object.entries on
  // it to make it easier to iterate and search.
  const teamClasses = Object.entries({
    Algo: 'acm-purple',
    Create: 'acm-pink',
    Design: 'acm-pink',
    Dev: 'acm-bluer',
    AI: 'acm-emerald',
    Marketing: 'acm-red',
    'Special Events': 'acm-yellow',
    nodebuds: 'brand-header',
  });

  $: [teamName, teamClass] = teamClasses.find((e) => {
    return officerPosition.startsWith(e[0]);
  }) || [null, 'acm-dark'];

  $: titleHTML = teamName
    ? officerPosition.replace(teamName, `<b class="${teamClass}">${teamName}</b>`)
    : officerPosition;

  $: officerTier = dev ? getOfficerTierByTermIndex(info, $termIndex) : '';
</script>

<label
  for="{officerID}-flipcard"
  class="officer-container"
  class:officer-has-socials={info.socials !== undefined}
  class:has-buggy-animations={hasBuggyAnimations}
  style="--accent: var(--{teamClass})"
>
  <input type="checkbox" id="{officerID}-flipcard" />
  <div class="officer-3d-flipcard">
    <div class="officer-flipcard">
      <img
        class="officer-image"
        src={`../assets/authors/${officerPicture}`}
        alt={`Image of ${officerName}.`}
      />
      <div class="officer-socials-box">
        <div class="officer-socials">
          <h3>Socials</h3>
          <div class="officer-social-scrolls">
            <div class="officer-social-links">
              {#if officerSocials.website}
                <p class="officer-website">
                  <a
                    target="blank"
                    title={officerSocials.website}
                    href="//{officerSocials.website}"
                  >
                    <Public /> <span>Website</span>
                  </a>
                </p>
              {/if}
              {#if officerSocials.github}
                <p class="officer-github">
                  <a
                    target="blank"
                    title={officerSocials.github}
                    href="https://github.com/{officerSocials.github}"
                  >
                    <GitHub /> <span>GitHub</span>
                  </a>
                </p>
              {/if}
              {#if officerSocials.discord}
                <p class="officer-discord">
                  <a
                    target="blank"
                    title={officerSocials.discord}
                    href={'javascript:void(0)'}
                    aria-label="Copy username to clipboard"
                    on:click={(event) => {
                      copyDiscord();
                      event.preventDefault();
                    }}
                  >
                    <Discord /> <span>Discord</span>
                  </a>
                </p>
              {/if}

              {#if officerSocials.linkedin}
                <p class="officer-linkedin">
                  <a
                    target="blank"
                    title={officerSocials.linkedin}
                    href="https://www.linkedin.com/in/{officerSocials.linkedin}"
                  >
                    <LinkedIn /> <span>LinkedIn</span>
                  </a>
                </p>
              {/if}
              {#if officerSocials.instagram}
                <p class="officer-instagram">
                  <a
                    target="blank"
                    title={officerSocials.instagram}
                    href="https://www.instagram.com/{officerSocials.instagram}/"
                  >
                    <Instagram /> <span>Instagram</span>
                  </a>
                </p>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="officer-placard">
    <h3 class="brand-header">
      {officerName}
      {#if officerTier}<br />{officerTier}<br />{/if}
    </h3>
    <p class="brand-med">
      {@html titleHTML}
    </p>
  </div>
</label>

<style lang="scss">
  .officer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .officer-flipcard {
      width: 200px;
      height: auto;
    }

    p {
      max-width: 250px;
    }
  }

  .officer-container.officer-has-socials {
    cursor: pointer;

    input:checked[type='checkbox'] + .officer-3d-flipcard {
      .officer-flipcard {
        transform: rotateY(180deg);
      }
    }

    &:hover .officer-image,
    input:checked[type='checkbox'] + .officer-3d-flipcard .officer-image {
      /* This hack stays until we can resolve #348. */
      filter: brightness(130%) contrast(85%);
    }

    .officer-placard {
      padding-bottom: 4px;
      border-bottom: 2px solid transparent;
    }

    &:hover .officer-placard,
    input:checked[type='checkbox'] ~ .officer-placard {
      border-bottom: 2px solid var(--accent);
    }
  }

  input[type='checkbox'] {
    display: none;
  }

  .officer-3d-flipcard {
    perspective: 2000px;

    .officer-flipcard {
      position: relative;
      height: 200px;
      transition: transform 0.3s ease;
      user-select: none;

      .officer-image,
      .officer-socials-box {
        top: 0;
        left: 0;
        position: absolute;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }

      .officer-image {
        height: 100%;
      }

      &,
      .officer-socials-box {
        transform-style: preserve-3d;
      }

      .officer-socials-box {
        transition: transform 0.3s ease, visibility 0.15s ease;
      }

      .officer-socials-box {
        width: 100%;
        height: 100%;
        transform: rotateY(180deg);

        display: flex;
        align-items: center;
        justify-content: center;

        .officer-socials {
          width: 180px;
          height: 180px;
          overflow: hidden;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          border-radius: 20px;
          box-sizing: border-box;

          background-color: var(--acm-canvas);

          h3 {
            line-height: 2.5em;
          }
        }

        .officer-social-scrolls {
          width: 100%;
          overflow-x: hidden;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;

          /* Firefox scrollbar styling. */
          scrollbar-width: thin;
          scrollbar-color: var(--accent) transparent;
          /* Chrome scrollbar styling. */
          &::-webkit-scrollbar {
            background: none;
            width: 3px;
            height: 50px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: var(--accent);
            border-radius: 3px;
          }
          &::-webkit-scrollbar-track-piece:end {
            /* Pad the scrollbar so it doesn't go into the corners. */
            margin-bottom: 20px;
          }

          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .officer-social-links {
          display: flex;
          flex-direction: column;
          gap: 0.35em;

          & > * {
            scroll-snap-align: start end;
          }
        }

        p {
          text-align: left;
          line-height: 2em;

          :global(svg) {
            width: 1.65em;
            height: 1.65em;
            margin-bottom: -0.45em;
            margin-right: 0.25em;
          }

          a {
            display: block;
            text-decoration: none;
            span {
              transition-property: color, border-color;
            }
          }

          &:hover a {
            span {
              color: var(--acm-blue);
              border-bottom: 1px solid var(--acm-blue);
            }
            :global(svg) {
              fill: var(--acm-blue);
            }
          }
        }
      }
    }
  }

  .officer-has-socials.has-buggy-animations {
    /* WebKit does filter weirdly, so we disable this entirely. */
    &:hover .officer-image,
    input:checked[type='checkbox'] + .officer-3d-flipcard .officer-image {
      filter: none;
    }

    /* Hack to hide the back of the flipcard because of weird rendering
	 * artifacts in WebKit-based (not Blink) browsers. */
    input:not(:checked)[type='checkbox'] + .officer-3d-flipcard {
      .officer-socials-box {
        display: none;
      }
    }
  }
</style>
