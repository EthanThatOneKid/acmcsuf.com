<script lang="ts">
  import { PINNED_TEAMS } from '$lib/public/board/data';
</script>

<section>
  <div class="container">
    <div class="teams-intro">
      <h2 class="brand-header size-lg">Discover your own passion</h2>

      <p class="size-sm">
        Each team was designed to allow students to explore the various fields within tech, and
        discover what aligns with their interests. Our teams offer interactive workshops that
        enhance technical knowledge, as well as fun projects to strengthen their abilities.
      </p>
    </div>

    <div class="teams-list">
      {#each PINNED_TEAMS as { title, id, picture, color } (id)}
        <a class="team-item" target="_self" href={`/teams#${id}`}>
          <img src={picture} alt={`${id} badge`} />

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
      }

      .teams-list {
        display: flex;
        gap: 96px;

        .team-item {
          display: flex;
          flex-direction: column;
          text-decoration: none;

          p {
            transition: 0.25s ease-in-out;
          }

          img {
            width: clamp(9.375rem, 8.8636rem + 2.2727vw, 12.5rem);
            transition: 0.25s ease-in-out;
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
