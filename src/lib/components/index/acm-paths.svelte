<script lang="ts">
  import { pinnedPaths } from '$lib/constants/acm-paths';
</script>

<section>
  <div class="container">
    <div class="paths-intro">
      <h2 class="brand-header size-lg">Discover your own path</h2>

      <p class="size-sm">
        Paths were designed to allow students to explore the various fields within tech, and
        discover what aligns with their interests the most. Our paths offer interactive workshops
        that enhance technical knowledge, as well as fun projects to strengthen their abilities.
      </p>
    </div>

    <div class="paths-list">
      {#each pinnedPaths as { title, slug, picture, color } (slug)}
        <a class="path-item" target="_self" href={`/paths#${slug}`}>
          <img src={picture} alt={`${slug}-logo`} />
          <p class="size-md brand-header">
            acm<span class="brand-bold" style:--brand-color={color}>
              {title}
            </span>
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
      padding: 0 24px;
      width: 1280px;
      gap: 64px;

      .paths-intro {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .paths-list {
        display: flex;
        gap: 96px;

        .path-item {
          display: flex;
          flex-direction: column;
          text-decoration: none;

          p span {
            color: var(--brand-color);
          }

          img {
            width: clamp(9.375rem, 8.8636rem + 2.2727vw, 12.5rem);
            transition: 0.25s ease-in-out;
          }

          &:hover {
            img {
              transform: scale(1.15);
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 900px) {
    section {
      .container {
        .paths-list {
          flex-direction: column;
          gap: 48px;
        }
      }
    }
  }
</style>


<!-- <script lang="ts">
  import { pinnedPaths } from '$lib/constants/acm-paths';
</script>

<section>
  <div class="paths-intro">
    <h2 class="headers size-lg">Find the path you want to take</h2>
    <p class="size-xs">
      Our programs were designed to allow students to explore the various fields within tech and
      discover what aligns with their interests the most. By joining any of them, students will be
      given access to exclusive workshops and projects that will build, enhance, and strengthen
      their technical and professional skills.
    </p>
  </div>

  <div class="paths-list">
    {#each pinnedPaths as { title, slug, picture, color } (slug)}
      <a class="path-item" target="_self" href={`/paths#${slug}`}>
        <img src={picture} alt={`${slug}-logo`} />
        <p class="size-md headers">
          acm<span class="brand-em" style:--brand-color={color}>
            {title}
          </span>
        </p>
      </a>
    {/each}
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 24px;
  }

  .paths-intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 1280px;
  }

  .paths-intro p {
    margin-top: 16px;
  }

  .paths-list {
    display: flex;
    justify-content: space-between;
    margin-top: 64px;
  }

  .path-item {
    display: flex;
    flex-direction: column;
    margin: 0 50px 0;
    align-items: center;
    text-decoration: none;
  }

  .path-item img {
    max-width: 200px;
    transform: scale(1);
    transition: 0.25s ease-in-out;
  }

  .path-item img:hover {
    transform: scale(1.15);
  }

  .path-item p span {
    color: var(--brand-color);
  }

  @media (max-width: 900px) {
    .paths-list {
      flex-direction: column;
      height: 700px;
    }

    .path-item img {
      max-width: 150px;
    }
  }
</style> -->
