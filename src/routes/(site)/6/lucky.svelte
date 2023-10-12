<script lang="ts">
  import AcmButton from '$lib/components/button/button.svelte';
</script>

<section class="hero-container">
  <div class="hero-inner-container">
    <div class="hero-text">
      <h1 class="brand-header size-xl">
        I'm feeling lucky!
      </h1>
      <div class="join-button">
        <AcmButton text="Join today!" link="/discord" redirect={true} />
      </div>
    </div>

    <img
      src="/assets/png/capy-lucky.png"
      alt="Chip the Capybara surrounded by all ACM Team badges"
    />
  </div>
</section>