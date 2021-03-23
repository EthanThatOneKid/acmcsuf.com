<footer>
  <span class="year">&copy; 2021</span>
  <img src="assets/badges/acm-csuf-badge.svg" width="48" class="acm-logo" />
  <span class="brand-em">CSUF</span>
  <!-- <a href="/">
    <object
      type="image/png"
      data="assets/badges/PNG/acm-csuf-badge.png"
      title="acm-csuf-logo"
    />
  </a>
  <span class="brand-em">CSUF</span> -->
</footer>

<style>
  footer {
    background-color: var(--acm-dark);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 112px;
    font-size: 24px;
  }

  footer .acm-logo {
    filter: drop-shadow(0 2px 3px rgba(55, 146, 193, 0.5));
  }

  footer .year {
    color: var(--acm-light);
    margin-right: 12px;
  }

  footer .brand-em {
    color: var(--acm-light);
    margin-left: 12px;
  }
</style>
