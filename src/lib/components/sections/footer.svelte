<script lang="ts">
  import Instagram from '$lib/components/icons/instagram.svelte';
  import Discord from '$lib/components/icons/discord.svelte';
  import Youtube from '$lib/components/icons/youtube.svelte';
  import Linkedin from '$lib/components/icons/linkedin.svelte';
  import AcmToggle from '$lib/components/utils/acm-toggle.svelte';
  import { AcmTheme, theme } from '$lib/stores/theme';
</script>

<footer>
  <div class="container">
    <div class="left">
      <h1 class="headers footer-text">Stay connected</h1>

      <div class="socials">
        <span>
          <a href="/instagram" class="links" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </a>
        </span>

        <span>
          <a href="/discord" class="links" target="_blank" rel="noopener noreferrer">
            <Discord />
          </a>
        </span>

        <span>
          <a href="/youtube" class="links" target="_blank" rel="noopener noreferrer">
            <Youtube />
          </a>
        </span>

        <span>
          <a href="/linkedin" class="links" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
        </span>
      </div>
    </div>

    <div class="mid">
      <div class="top">
        <h1 class="brand-med footer-text">
          &copy; 2022
          <span class="headers footer-text">
            acm<span class="brand-em footer-text">CSUF</span>
          </span>
        </h1>

        <div class="links footer-text">
          <a href="/privacy" class="footer-text" rel="noopener noreferrer"> frankBot Privacy </a>

          /

          <a href="/bug" class="footer-text" target="_blank" rel="noopener noreferrer">
            Report a Bug
          </a>
        </div>
      </div>

      <div class="bottom">
        <h2 class="headers footer-text">Get in touch</h2>

        <a
          href="mailto:acmcsufullerton@gmail.com"
          class="footer-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          acmcsufullerton@gmail.com
        </a>
      </div>
    </div>

    <div class="right">
      <h1 class="headers footer-text">More from us</h1>

      <div class="links">
        <span>
          <a href="/blog" class="footer-text" rel="noopener noreferrer">Blog</a>
        </span>

        <span>
          <a href="/covid-19" class="footer-text" target="_blank" rel="noopener noreferrer">
            COVID-19 Policy
          </a>
        </span>

        <span>
          <a href="/github" class="footer-text" target="_blank" rel="noopener noreferrer">
            Source Code
          </a>
        </span>

        <span>
          <!-- true is dark -->
          <AcmToggle
            checked={$theme === AcmTheme.Dark}
            on:toggle={(event) => ($theme = event.detail ? AcmTheme.Dark : AcmTheme.Light)}
          >
            <span class="footer-text">Darkmode</span>
          </AcmToggle>
        </span>
      </div>
    </div>
  </div>
</footer>

<style lang="scss">
  footer {
    --ever-white: #f8f8f8; /* does not change with theme */

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--footer-bg);
    padding: 24px 0;
    width: 100vw;

    .footer-text {
      color: var(--ever-white);
    }

    .container {
      display: flex;
      justify-content: space-between;
      margin: 0 24px;
      width: 1280px;

      .left,
      .mid,
      .right {
        width: 250px;

        h1 {
          font-size: 24px;
          padding-bottom: 8px;
        }
      }

      .left {
        text-align: left;

        .socials {
          display: grid;
          grid-template-columns: repeat(4, 1fr);

          .links {
            & :global(svg) {
              height: 32px;
              width: 32px;
            }

            & :global(path) {
              fill: var(--ever-white);
              transition: fill 0.25s ease-in-out;
            }

            &:hover :global(path) {
              fill: var(--acm-blue);
            }
          }
        }
      }

      .mid {
        text-align: center;

        .top {
          margin-bottom: 32px;

          .links {
            font-size: 14px;

            a {
              text-decoration: none;
              transition: 0.25s ease-in-out;

              &:hover {
                color: var(--acm-blue);
              }
            }
          }
        }

        .bottom {
          h2 {
            font-size: 16px;
          }

          a {
            text-decoration: none;
            font-size: 14px;
            transition: 0.25s ease-in-out;

            &:hover {
              color: var(--acm-blue);
            }
          }
        }
      }

      .right {
        text-align: right;

        .links {
          display: flex;
          flex-direction: column;

          a {
            text-decoration: none;
            font-size: 14px;
            transition: 0.25s ease-in-out;

            &:hover {
              color: var(--acm-blue);
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  @media (max-width: 900px) {
    .container {
      flex-direction: column;
      align-items: center;

      .left,
      .mid,
      .right {
        text-align: center !important;
      }

      .left {
        order: 2;
        margin: 64px 0;
      }

      .mid {
        order: 1;
      }

      .right {
        order: 3;
      }
    }
  }
</style>
