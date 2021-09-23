<script lang="ts">
  export let placeholderPicture: string = "placeholder.png";
  export let name: string = "";
  export let title: string = "";
  export let picture: string = placeholderPicture;

  let officerName = name;
  let officerPicture = picture;
  let titleHTML = title
    .replace(/Create/, `<span class="brand-em brand-pink">Create</span>`)
    .replace(/Algo/, `<span class="brand-em brand-purple">Algo</span>`)
    .replace(/Dev/, `<span class="brand-em brand-bluer">Dev</span>`)
    .replace(/ACM-W/, `<span class="brand-em brand-red">ACM-W</span>`)
    .replace(/President/, `<span class="brand-em brand-blue">President</span>`)
    .replace(/Webmaster/, `<span class="brand-em brand-blue">Webmaster</span>`)
    .replace(/Treasurer/, `<span class="brand-em brand-blue">Treasurer</span>`)
    .replace(
      /NodeBuds/,
      `<span class="brand-em">Node<span class="brand-red">Buds</span></span>`
    );
</script>

<div class="officer-container">
  <img
    class="officer-image"
    src="{`../assets/authors/${officerPicture}`}"
    alt="{`Image of ${officerName}.`}"
  />
  <h3 class="headers">
    {officerName}
  </h3>
  <p>
    {@html titleHTML}
  </p>
</div>

<style lang="scss">
  @import "static/theme.scss";

  .officer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 64px 64px 0;
    text-align: center;
  }

  .officer-image {
    width: 150px;
    height: 150px;
  }

  h3 {
    color: var(--acm-dark);
    margin-top: 8px;
  }

  p {
    font-weight: 500;
    max-width: 150px;
    color: var(--acm-dark);
  }
</style>
