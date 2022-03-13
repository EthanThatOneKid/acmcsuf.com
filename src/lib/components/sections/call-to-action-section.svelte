<script lang="ts">
  import AcmButton from '$lib/components/utils/acm-button.svelte';
  import { links } from '$lib/constants/links';
</script>

<section>
  <div class="main-text">
    <slot name="headline" tag="h2" />
    <slot name="text" tag="p" />
  </div>
  <AcmButton text="join us today!" link={links.discord} />
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0 24px;
  }

  section .main-text {
    max-width: 950px;
  }

  section :global(p) {
    margin-top: 16px;
  }
</style>
