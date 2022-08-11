<section>
  <div class="container">
    <img src="assets/png/join-photo.png" alt="Social event with ACM Chapter members." />

    <div class="right">
      <h2 class="size-lg brand-header">Your journey into tech starts here</h2>

      <p class="size-sm">
        We aim to build a foundation for future industry leaders by developing their technical,
        professional, and social skills. We facilitate these by offering various events, programs,
        and initiatives that have been proven to help students start up their careers on the right
        foot.
      </p>
    </div>
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
      text-align: right;
      justify-content: space-between;
      padding: 0 16px;
      width: 1280px;

      img {
        width: clamp(12.5rem, 11.1184rem + 7.8947vw, 23.75rem);
        margin-right: 32px;
        filter: drop-shadow(0 10px 40px rgba(44, 145, 198, 0.5));
      }

      .right {
        display: flex;
        flex-direction: column;
        gap: 16px;

        p {
          max-width: 650px;
        }
      }
    }
  }

  @media screen and (max-width: 900px) {
    section .container {
      flex-direction: column;
      text-align: center;
      padding: 0 8px;
      gap: 64px;

      img {
        margin: 0;
        filter: drop-shadow(0 6px 24px rgba(44, 145, 198, 0.5));
      }
    }
  }
</style>
