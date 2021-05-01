<section>
  <slot name="content" tag="p" />
</section>

<style>
  section {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  section :global(p) {
    font-size: var(--subheading-font-size);
    margin: 20px;
  }
</style>
