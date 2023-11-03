<script lang="ts">
  import AcmButton from '$lib/components/button/button.svelte';
</script>

<section class="lucky-container">
  <div class="lucky-inner-container">
    <div class="lucky-text">
      <h1 class="brand-header size-xl">I'm feeling lucky!</h1>
      <div class="lucky-button">
        <AcmButton text="Visit a random page?" link="/random" redirect />
      </div>
    </div>

    <img
      src="/assets/png/capy-lucky.png"
      alt="Chip the Capybara surrounded by all ACM Team badges"
    />
  </div>
</section>

<style>
  section {
    display: grid;
  }
  section .lucky-inner-container {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 3em;
  }
  section .lucky-inner-container .lucky-text {
    display: grid;
    align-items: center;
    text-align: center;
    gap: 3em;
  }
  section .lucky-inner-container .lucky-text .lucky-button {
    display: grid;
    justify-self: center;
  }
  section .lucky-inner-container img {
    max-width: clamp(20rem, 17.342rem + 10.13vw, 30rem);
    justify-self: center;
  }
</style>
