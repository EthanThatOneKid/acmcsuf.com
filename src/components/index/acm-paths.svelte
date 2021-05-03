<script lang="ts">
  import { acmPaths } from "../../lib/acm-paths";
  import { styleProps } from "../../actions/use-style-props";
</script>

<section>
  <div class="paths-intro">
    <h2>Get involved with our paths!</h2>
    <p>
      Are you looking to specialize somewhere specific in tech? Our paths were
      designed to jumpstart student's own journeys in the tech industry.
    </p>
  </div>

  <div class="paths-list">
    {#each acmPaths as { title, slug, picture, color } (slug)}
      <a class="path-item" href="{`/paths#${slug}`}">
        <img src="{picture}" alt="{`${slug}-logo`}" />
        <p>
          acm<span use:styleProps="{{ 'brand-color': color }}">{title}</span>
        </p>
      </a>
    {/each}
  </div>
</section>

<style>
  .paths-intro {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .paths-intro h2 {
    text-transform: lowercase;
    font-size: var(--heading-font-size);
    text-align: center;
    margin: 0 20px 20px 20px;
  }

  .paths-intro p {
    text-align: center;
    font-size: var(--body-font-size);
    margin: 0 20px;
  }

  .paths-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .path-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    padding: 5em 0 0 0;
  }

  .path-item img {
    width: 175px;
    height: 175px;
    padding-bottom: 20px;
  }

  .path-item p {
    font-size: var(--subheading-font-size);
    font-weight: 700;
    text-decoration: none;
  }

  .path-item p span {
    color: var(--brand-color);
  }

  @media (min-width: 768px) {
    .paths-intro p {
      margin: 0 186px;
    }

    .paths-list {
      flex-direction: row;
      justify-content: space-evenly;
    }

    .path-item img {
      width: 200px;
      height: 200px;
    }
  }

  @media screen and (min-width: 1440px) {
    .path-item img {
      width: 250px;
      height: 250px;
    }
  }
</style>
