<script>
  import AcmButton from '$lib/components/utils/acm-button.svelte';
</script>

<section>
  <div class="left-content">
    <div class="main-text headers size-xl">
      We are the largest tech community at
      <span class="brand-em brand-blue">CSUF</span>
    </div>

    <AcmButton text="Join us today!" link="/discord" />
  </div>

  <img
    src="assets/png/hero-illustration.png"
    alt="Frank the shark (ACM CSUF's mascot) is holding a flag that says 'I ♥ ACM'" />
</section>

<style lang="scss">
  @import 'static/theme.scss';

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 24px;
  }

  section .left-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  section .left-content .main-text {
    max-width: 570px;
  }

  section img {
    max-width: 468px;
    margin-left: 120px;
    filter: drop-shadow(0 10px 40px rgba(44, 145, 198, 0.5));
  }

  @media (max-width: 839px) {
    section {
      flex-direction: column-reverse;
    }

    section img {
      margin-left: 0;
      margin-bottom: 32px;
    }

    section .left-content {
      align-items: center;
      text-align: center;
    }
  }

  @media (max-width: 559px) {
    section img {
      max-width: 280px;
    }
  }
</style>
