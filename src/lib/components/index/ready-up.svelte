<script lang="ts">
  import AcmButton from '$lib/components/utils/acm-button.svelte';
  import Spacing from '$lib/components/sections/spacing.svelte';
</script>

<section>
  <div class="main-text">
    <h2 class="headers size-lg">Ready to get started?</h2>
    <p class="size-xs">
      If you want to improve your skills, want to learn how to break into the industry, or just got
      a passion for technology, then we are the perfect organization for you!
      <br />
      <Spacing --min="16px" --med="16px" --max="0" />
      <span class="brand-med"
        >Our student-chapter with 600+ members is forever free and open for anyone to join,
        regardless of major or technical ability.
      </span>
    </p>
  </div>
  <AcmButton text="Join us today!" link="/discord" />
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
    max-width: 1280px;
  }

  section p {
    margin-top: 16px;
  }
</style>
