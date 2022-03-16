<section>
  <div class="info-container">
    <h2 class="headers size-lg">Testimonials</h2>
    <span class="size-sm">
      <slot name="content1" tag="p" />
      <slot name="content2" tag="p" />
      <slot name="content3" tag="p" />
    </span>
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .info-container {
    width: 1064px;
  }

  .info-container span {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  .info-container :global(h2) {
    padding-bottom: 16px;
  }

  .info-container :global(p) {
    max-width: 250px;
  }

  @media (max-width: 839px) {
    .info-container span {
      flex-direction: column;
      align-items: center;
    }

    .info-container :global(p) {
      max-width: 450px;
      margin-bottom: 32px;
    }
  }
</style>
