<script lang="ts">
  export let src: string = "../assets/badges/png/acm-csuf-badge.png";
  export let alt: string = "ACM CSUF Logo";
</script>

<section>
  <header>
    <object type="image/png" data="{src}" title="{alt}"></object>
    <slot name="title" tag="h1" class="title" />
  </header>
  <div>
    <slot name="headline" tag="h2" class="headline" />
    <slot name="text" tag="p" class="text" />
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

  section header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  section header object {
    width: 100px;
  }

  section header :global(h1) {
    margin: 0;
    font-size: 4rem;
    font-weight: bold;
  }

  section div {
    text-align: center;
    margin: 0 32px;
  }

  section div :global(h2) {
    font-size: 3rem;
    margin: 48px 0 32px 0;
  }

  section div :global(p) {
    margin: 0 3rem;
    font-size: 2rem;
  }

  @media screen and (min-width: 768px) {
    section header {
      flex-direction: row;
    }

    section header object {
      width: 150px;
      padding-right: 3rem;
    }

    section header :global(h1) {
      font-size: 5.38rem;
    }

    section div {
      text-align: center;
      max-width: 64rem;
    }

    /* section div :global(h2) {
      font-size: 3rem;
    } */
  }
</style>
