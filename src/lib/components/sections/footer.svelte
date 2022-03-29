<script lang="ts">
  import Instagram from '../icons/instagram.svelte';
  import Discord from '../icons/discord.svelte';
  import YouTube from '../icons/youtube.svelte';
  import LinkedIn from '../icons/linkedin.svelte';
  import { links } from '$lib/constants/links';

  const footItem = [
    { title: 'Source Code', path: '/github' },
    { title: 'Report a Bug', path: '/bug' },
    { title: 'COVID-19 Policy', path: '/covid-19' },
    { title: 'frankBot Privacy', path: '/privacy' },
  ];

  const socialItems = [
    { icon: Discord, path: links.discord },
    { icon: Instagram, path: links.instagram },
    { icon: YouTube, path: links.youtube },
    { icon: LinkedIn, path: links.linkedin },
  ];
</script>

<footer>
  <div class="container">
    <div class="connect">
      <h3 class="brand-header size-md">Stay connected</h3>

      <ul class="socials">
        {#each socialItems as { path, icon } (path)}
          <li>
            <a href={path} target="_blank" rel="noopener noreferrer">
              <svelte:component this={icon} />
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <div class="legal">
      <h3 class="brand-header size-md">
        &copy; 2022 acm<span class="brand-bold">CSUF</span>
      </h3>

      <a
        href="mailto:acmcsufullerton@gmail.com"
        class="brand-med size-sm"
        target="_blank"
        rel="noopener noreferrer"
        >Get in Touch
      </a>
    </div>

    <div class="more">
      <h3 class="brand-header size-md">More from us</h3>

      <ul class="links">
        {#each footItem as { title, path } (path)}
          <li>
            <a href={path} class="brand-med size-sm" target="_blank" rel="noopener noreferrer">
              {@html title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</footer>

<style lang="scss">
  footer {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 24px 0;
    background-color: var(--footer-bg);

    .container {
      display: flex;
      justify-content: space-between;
      padding: 0 24px;
      width: 1280px;

      ul,
      li {
        list-style: none;
      }

      a {
        color: var(--perma-light);
        text-decoration: none;
        transition: 0.25s ease-in-out;

        &:hover {
          color: var(--acm-blue);
        }
      }

      .connect,
      .legal,
      .more {
        display: flex;
        flex-direction: column;
        width: 250px;
        gap: 4px;

        h3,
        h3 span {
          color: var(--perma-light);
        }
      }

      .connect {
        align-items: flex-start;

        .socials {
          display: flex;
          gap: 32px;

          a {
            display: flex;
            padding-top: 6px;

            &:hover {
              & :global(path) {
                fill: var(--acm-blue);
              }
            }
          }

          & :global(svg) {
            height: 32px;
            width: auto;
          }

          & :global(path) {
            fill: var(--perma-light);
            transition: 0.25s ease-in-out;
          }
        }
      }

      .legal {
        align-items: center;
        text-align: center;
      }

      .more {
        align-items: flex-end;
        text-align: right;
      }
    }
  }

  @media screen and (max-width: 900px) {
    footer {
      .container {
        flex-direction: column;
        align-items: center;
        gap: 32px;

        a {
          font-size: var(--size-sm);
        }

        .legal {
          order: 1;
        }

        .connect {
          order: 2;
          align-items: center;
        }

        .more {
          order: 3;
          align-items: center;
          text-align: center;
        }
      }
    }
  }
</style>
