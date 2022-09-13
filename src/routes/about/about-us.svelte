<section>
  <div class="container">
    <img src="assets/jpg/group-photo.jpeg" alt="ACM family" />

    <div class="text">
      <h1 class="size-lg brand-header">About us</h1>

      <p class="size-sm">
        We are a student chapter of the
        <a href="https://acm.org" class="brand-med" target="_blank" rel="noopener noreferrer">
          Association for Computing Machinery</a
        >, an international organization based in New York that advocates for the advancement of
        computer science as a science and profession. Based in California State University,
        Fullerton, we strive to bring passionate Titans together into a community that promotes
        innovation, collaboration, creativity, and inclusivity within tech.
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
      flex-direction: column;
      align-items: center;
      padding: 0 16px;
      width: 1280px;
      gap: 64px;

      img {
        min-width: 250px;
        max-width: 1200px;
        width: 100%;
        border-radius: 20px;
      }

      .text {
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 16px;

        p a {
          text-decoration: none;
          transition: 0.25s ease-in-out;

          &:hover {
            color: var(--acm-blue);
          }
        }
      }
    }
  }

  @media screen and (max-width: 900px) {
    section .container {
      padding: 0 8px;
    }
  }
</style>
