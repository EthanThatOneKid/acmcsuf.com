<script lang="ts">
  import AcmButton from '$lib/components/button/button.svelte';
</script>

<section>
  <div class="container">
    <div class="left">
      <h1 class="brand-header size-xl">
        We are the largest computer science community at
        <b class="acm-blue">CSUF</b>
      </h1>

      <AcmButton text="Join us today!" link="/discord" />
    </div>

    <img
      src="assets/png/hero-photo.png"
      alt="Frank the Shark holding a flag that says 'I Love ACM'"
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
          max-width: clamp(21.875rem, 18.8048rem + 17.5439vw, 46.875rem);
        }
      }

      img {
        width: clamp(20rem, 17.342rem + 10.13vw, 30rem);
        margin-left: 32px;
        filter: drop-shadow(0 10px 40px rgba(44, 145, 198, 0.5));
      }
    }
  }

  @media screen and (max-width: 900px) {
    section .container {
      padding: 0 8px;
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
        filter: drop-shadow(0 6px 24px rgba(44, 145, 198, 0.5));
      }
    }
  }
</style>
