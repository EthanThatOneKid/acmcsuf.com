<script lang="ts">
  import { acmPaths } from "../../lib/acm-paths";
  import { styleProps } from "../../actions/use-style-props";
</script>

<section>
  <div class="paths-intro">
    <h2>get involved with our paths!</h2>
    <p>
      Want to specialize somewhere specific in tech? Our paths were designed to
      give students a head start in their own tech journeys, making them
      prepared for the industry.
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
    font-size: 3rem;
    text-align: center;
    margin: 0 1em 1em 1em;
  }

  .paths-intro p {
    text-align: center;
    font-size: 2rem;
    max-width: 50vw;
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
    width: 250px;
    height: 250px;
  }

  .path-item p {
    font-size: var(--max-p-font-size);
    font-weight: 700;
    text-decoration: none;
  }

  .path-item p span {
    color: var(--brand-color);
  }
</style>
