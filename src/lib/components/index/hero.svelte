<script lang="ts">
  import AcmButton from '$lib/components/utils/acm-button.svelte';
</script>

<section>
  <div class="container">
    <div class="left">
      <h1 class="brand-header size-xl">
        The largest CS community at
        <span class="brand-bold acm-blue">CSUF</span>
      </h1>

      <AcmButton text="Join us today!" link="/discord" />
    </div>

    <img
      src="assets/png/hero-illustration.png"
      alt="Frank the Shark (acmCSUF's mascot) is holding a flag that says 'I Love ACM'"
    />
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      width: 1280px;

      .left {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: 64px;

        h1 {
          max-width: clamp(25rem, 22.3136rem + 15.3509vw, 46.875rem);
        }
      }

      img {
        width: clamp(15.625rem, 13.7061rem + 10.9649vw, 31.25rem);
        margin-left: 32px;
        filter: drop-shadow(0 10px 40px rgba(44, 145, 198, 0.5));
      }
    }
  }
  @media screen and (max-width: 900px) {
    section {
      .container {
        flex-direction: column-reverse;

        .left {
          align-items: center;
          text-align: center;
          gap: 32px;

          h1 {
            font-size: var(--size-lg);
          }
        }

        img {
          margin: 0;
          padding-bottom: 64px;
        }
      }
    }
  }
</style>
