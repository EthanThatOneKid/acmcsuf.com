<script lang="ts">
  import CallToAction from "@/components/utils/call-to-action.svelte";
</script>

<section>
  <h2>so what you are waiting for?</h2>
  <p>
    We invite you to become a part of our chapter consisting of
    <b>350<span class="brand-blue">+</span> members</b>, and rising! All of our
    coding workshops, info sessions, and community events were designed to start
    off your tech journey on the right foot.
  </p>
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

  section h2 {
    font-size: var(--heading-font-size);
    padding-bottom: 20px;
  }

  section p {
    font-size: var(--body-font-size);
  }

  @media (min-width: 768px) {
    section {
      padding: 0 180px;
    }
  }
</style>
