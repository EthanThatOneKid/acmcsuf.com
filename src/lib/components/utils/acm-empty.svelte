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
    font-size: var(--size-lg);
    margin: 20px;
  }
</style>
