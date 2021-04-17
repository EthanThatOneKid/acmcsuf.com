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
    max-width: 55vw; /* Here, max-width is being used to keep the text from overtaking the image's visual hierarchy. */
    font-size: var(--fluid-font-size);
    text-align: center;
  }

  .info-container :global(h2) {
    font-size: var(--heading-font-size);
    margin-bottom: 20px;
    hyphens: auto; /* Read: https://css-tricks.com/almanac/properties/h/hyphenate/ */
  }

  .info-container :global(p) {
    font-size: var(--body-font-size);
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
      padding: 0 20px;
    }

    .info-container {
      text-align: start;
    }
  }
</style>
