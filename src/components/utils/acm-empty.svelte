<section>
  <img src="../assets/png/acm-csuf-badge.png" alt="ACM CSUF Logo" />
  <slot name="content" tag="p" />
</section>

<style>
  section {
    display: flex;
    align-items: center;
  }

  section :global(p) {
    font-size: var(--subheading-font-size);
    margin: 20px;
  }
</style>
