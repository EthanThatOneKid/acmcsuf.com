<script lang="ts">
  import AcmButton from '$lib/components/utils/acm-button.svelte';
</script>

<section>
  <div class="container">
    <div class="main">
      <h2 class="brand-header size-lg">Ready to get started?</h2>

      <p class="size-sm">
        If you want to improve your coding skills, find out how to break into the tech industry,
        connect with other people, pick up a new hobby, or just want to be involved in the tech
        space, then this is the place to be.

        <br /><br />

        <span class="brand-med"
          >Our chapter of 700+ members is forever free and open for anyone to join, regardless of
          major or technical ability.</span
        >
      </p>
    </div>

    <AcmButton text="Join us today!" link="/discord" />
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      width: 1280px;
      gap: 64px;

      .main {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }
  }
</style>
