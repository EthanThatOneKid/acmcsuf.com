<script lang="ts">
  import { PINNED_TEAMS } from '$lib/public/board/data';
</script>

<section>
  <div class="container">
    <div class="teams-intro">
      <h2 class="acm-heavier size-lg">Discover your own passion</h2>

      <p class="size-sm">
        Each team was designed to allow students to explore the various fields within tech, and
        discover what aligns with their interests. Our teams offer interactive workshops that
        enhance technical knowledge, as well as fun projects to strengthen their abilities.
      </p>
    </div>

    <div class="teams-list">
      {#each PINNED_TEAMS as { title, id, logoSrc, color } (id)}
        <a class="team-item" target="_self" href={`/teams#${id}`}>
          <img src={logoSrc} alt={`${id} badge`} />
          <p class="size-md brand-bold" style:--brand-color={color}>
            {title}
          </p>
        </a>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      width: 1280px;
      gap: 64px;

      .teams-intro {
        display: flex;
        flex-direction: column;
        gap: 16px;

        p {
          max-width: 50ch;
        }
      }

      .teams-list {
        display: flex;
        gap: 96px;

        .team-item {
          position: relative;
          display: flex;
          flex-direction: column;
          text-decoration: none;

          p {
            transition: 0.25s ease-in-out;
          }

          img {
            width: clamp(9.375rem, 8.8636rem + 2.2727vw, 12.5rem);
            min-height: clamp(200px, 30vh, 300px);
            transition: 0.25s ease-in-out;
          }

          /* for tall displays, utilize stacked team-item design */
          @media screen and (max-width: 900px) {
            img {
              mix-blend-mode: multiply;
              transform: scale(1.2);
            }
            p {
              font-family: Impact;
              font-weight: 500;
              position: absolute;
              letter-spacing: -0.2vw;
              top: 50%;
              left: 50%;
              z-index: -1;
              text-transform: uppercase;
            }
          }

          &:hover {
            img {
              transform: scale(1.15);
            }

            p {
              color: var(--brand-color);
            }
          }
        }

        /* ad-hoc team-item > p handling for tall displays (mobile, tablets)*/
        @media screen and (max-width: 900px) {
          .team-item:nth-child(1) > p {
            transform: translate(-50%, -50%) scaleY(3.2) scaleX(3.2);
            font-size: 5rem;
          }

          .team-item:nth-child(2) > p {
            transform: translate(-50%, -50%) scaleY(5.2) scaleX(3.2);
            font-size: 3rem;
          }

          .team-item:nth-child(3) > p {
            transform: translate(-50%, -50%) scaleY(8.2) scaleX(3.6);
            font-size: 2rem;
          }

          .team-item:nth-child(4) > p {
            transform: translate(-50%, -50%) scaleY(8.2) scaleX(3.6);
            font-size: 2.5rem;
          }
        }
      }
    }
  }

  @media screen and (max-width: 900px) {
    section .container {
      padding: 0 8px;

      .teams-list {
        flex-direction: column;
        gap: 48px;
      }
    }
  }
</style>
