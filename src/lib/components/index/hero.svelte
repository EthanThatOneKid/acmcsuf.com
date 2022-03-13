<script>
  import AcmButton from '$lib/components/utils/acm-button.svelte';
</script>

<section>
  <div class="container">
    <div class="left-content">
      <div class="main-text headers size-xl">
        We are the largest tech community at
        <span class="brand-em brand-blue">CSUF</span>
      </div>

      <AcmButton text="Join us today!" link="/discord" />
    </div>

    <img
      src="assets/png/hero-illustration.png"
      alt="Frank the shark (ACM CSUF's mascot) is holding a flag that says 'I ♥ ACM'"
    />
  </div>
</section>

<style lang="scss">
  @import 'node_modules/rfs/scss';

  .size-xl {
    @include font-size(var(--size-xl));
  }

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 24px;

    .container {
      display: flex;
      justify-content: space-between;
      width: 1280px;
    }

    .left-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      .main-text {
        max-width: 570px;
      }
    }

    img {
      max-width: 470px;
      margin-left: 64px;
      filter: drop-shadow(0 10px 40px rgba(44, 145, 198, 0.5));
    }
  }

  @media (max-width: 900px) {
    .container {
      flex-direction: column-reverse;
      align-items: center;
      justify-content: center;

      img {
        margin-left: 0;
        margin-bottom: 32px;
      }

      .left-content {
        align-items: center;
        text-align: center;
      }
    }
  }

  @media (max-width: 1100px) {
    section img {
      max-width: 321px;
      max-height: 240px;
      filter: drop-shadow(0 6px 30px rgba(44, 145, 198, 0.5));
    }
  }
</style>
