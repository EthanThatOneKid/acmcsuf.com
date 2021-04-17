<script lang="ts">
  import CallToAction from "@/components/utils/call-to-action.svelte";
</script>

<section>
  <slot name="headline" tag="h2" />
  <slot name="text" tag="p" />
  <CallToAction text="join us today!" />
</section>

<style>
  section {
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  section :global(h2) {
    font-size: var(--subheading-font-size);
    padding-bottom: 20px;
  }

  section :global(p) {
    font-size: var(--body-font-size);
  }

  @media (min-width: 768px) {
    section {
      padding: 0 180px;
    }
  }
</style>
