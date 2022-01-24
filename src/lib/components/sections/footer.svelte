<script lang="ts">
  import Instagram from '../icons/instagram.svelte';
  import Discord from '../icons/discord.svelte';
  import Youtube from '../icons/youtube.svelte';
  import Linkedin from '../icons/linkedin.svelte';
</script>

<footer>
  <div class="container">
    <div class="left">
      <h1 class="headers brand-light">Stay connected</h1>

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
        <h1 class="brand-med brand-light">
          &copy; 2022
          <span class="headers brand-light">
            acm<span class="brand-em brand-light">CSUF</span>
          </span>
        </h1>

        <div class="links brand-light">
          <a href="/privacy" class="brand-light" target="_blank" rel="noopener noreferrer">
            frankBot Privacy
          </a>

          /

          <a href="/bug" class="brand-light" target="_blank" rel="noopener noreferrer">
            Report a Bug
          </a>
        </div>
      </div>

      <div class="bottom">
        <h2 class="headers brand-light">Get in touch</h2>

        <a
          href="mailto:acmcsufullerton@gmail.com"
          class="brand-light"
          target="_blank"
          rel="noopener noreferrer">
          acmcsufullerton@gmail.com
        </a>
      </div>
    </div>

    <div class="right">
      <h1 class="headers brand-light">More from us</h1>

      <div class="links">
        <span>
          <a href="/blog" class="brand-light" target="_blank" rel="noopener noreferrer">Blog</a>
        </span>

        <span>
          <a href="/covid-19" class="brand-light" target="_blank" rel="noopener noreferrer">
            COVID-19 Notice
          </a>
        </span>

        <span>
          <a href="/github" class="brand-light" target="_blank" rel="noopener noreferrer">
            Source Code
          </a>
        </span>
      </div>
    </div>
  </div>
</footer>

<style lang="scss">
  @import 'static/theme.scss';

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--acm-dark);
    padding: 24px 0;
    width: 100vw;

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
              fill: var(--acm-light);
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
