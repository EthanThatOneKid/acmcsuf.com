<section>
  <div class="container">
    <img src="assets/png/why-join-illustration.png" alt="Social event with acmCSUF club members." />

    <div class="right-content">
      <h2 class="size-lg headers g">Your journey into tech starts here</h2>
      <p class="size-xs">
        We aim to build a foundation for future industry leaders by developing their technical and
        professional skills. We facilitate these by offering free workshops, social events, guest
        speaker sessions, and a mentorship program; all of which have been proven to help students
        start on the right path for their careers.
      </p>
    </div>
  </div>
</section>

<style lang="scss">
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

    img {
      max-width: 350px;
      margin-right: 64px;
      filter: drop-shadow(0 14px 56px rgba(44, 145, 198, 0.5));
    }

    .right-content {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      text-align: right;
      justify-content: center;
      max-width: 680px;

      p {
        padding-top: 16px;
      }
    }
  }

  @media (max-width: 900px) {
    .container {
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        margin-right: 0;
        margin-bottom: 32px;
      }

      .right-content {
        align-items: center;
        text-align: center;
      }
    }
  }

  @media (max-width: 1100px) {
    section img {
      max-width: 240px;
      filter: drop-shadow(0 6px 30px rgba(44, 145, 198, 0.5));
    }
  }
</style>
