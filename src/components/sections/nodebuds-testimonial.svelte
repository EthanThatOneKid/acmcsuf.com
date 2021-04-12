<script lang="ts">
  export let src: string;
  export let alt: string;
</script>

<section>
  <div class="info-container">
    <h2>testimonial - <slot name="semester" tag="span" /></h2>
    <slot name="content" tag="p" />
  </div>
  <div class="image-container">
    <img src="{src}" alt="{alt}" />
  </div>
</section>

<style>
  section {
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    justify-content: center;
  }

  .info-container {
    max-width: 55vw;
    margin-bottom: 2em;
    font-size: var(--fluid-font-size);
    text-align: center;
  }

  .info-container :global(h2) {
    font-size: var(--h-font-size-med);
    margin-bottom: 1em;
  }

  .info-container :global(p) {
    font-size: var(--p-font-size);
  }

  .image-container img {
    width: max(55vw, 550px);
    max-width: 100%;
  }

  @media screen and (min-width: 768px) {
    section {
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding: 0 2em;
    }

    .info-container {
      text-align: start;
    }
  }
</style>
