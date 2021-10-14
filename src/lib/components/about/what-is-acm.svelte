<section>
  <img class="main" src="assets/about-illustration.svg" alt="acmCSUF badges" />
  <img class="mobile" src="assets/badges/general.svg" alt="acmCSUF badge" />
</section>

<style>
  section {
    display: flex;
    justify-content: center;
  }
  .main {
    min-width: 600px;
    margin: 0 32px;
  }
  .mobile {
    display: none;
  }
  @media (max-width: 619px) {
    .main {
      display: none;
    }
    .mobile {
      display: flex;
      justify-content: center;
      max-width: 150px;
      margin: 0 32px;
      filter: drop-shadow(0 6px 24px rgba(44, 145, 198, 0.5));
      -webkit-filter: drop-shadow(0 6px 24px rgba(44, 145, 198, 0.5));
    }
  }
</style>
