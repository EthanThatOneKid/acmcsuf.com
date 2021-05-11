<script lang="ts">
  const placeholderPicture = "placeholder.png";

  export let name: string = "";
  export let title: string = "";
  export let picture: string = placeholderPicture;

  title = title
    .replace(/Create/, `<span class="brand-em brand-pink">Create</span>`)
    .replace(/Algo/, `<span class="brand-em brand-purple">Algo</span>`)
    .replace(/Dev/, `<span class="brand-em brand-bluer">Dev</span>`)
    .replace(/Webmaster/, `<span class="brand-em brand-blue">Webmaster</span>`)
    .replace(
      /NodeBuds/,
      `<span class="brand-em">Node<span class="brand-red">Buds</span></span>`
    );
</script>

<div class="officer-container">
  <img
    class="officer-image"
    src="{`../assets/authors/${picture}`}"
    alt="{`Image of ${name}.`}"
  />
  <h3>
    {name}
  </h3>
  <p>
    {@html title}
  </p>
</div>

<style>
  .officer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 64px;
  }

  .officer-image {
    width: 200px;
    height: 200px;
  }

  h3 {
    font-size: 1.5rem;
    color: var(--acm-dark);
  }
</style>
