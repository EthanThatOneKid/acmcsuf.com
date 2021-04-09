<script lang="ts">
  export let src: string;
  export let alt: sting;
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
    flex-direction: column;
    justify-content: center;
    padding-top: 175px;
  }

  .info-container {
    max-width: 45vw;
    margin-bottom: 2em;
  }

  .info-container :global(h2) {
    font-size: 3rem;
    margin-bottom: 1em;
  }

  .info-container :global(p) {
    font-size: 2rem;
  }

  .image-container img {
    max-width: 900px;
    width: 45vw;
  }
</style>
