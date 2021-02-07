<footer>
  <span class="footer-year">&copy; 2021</span>
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

<style lang="scss">
  @import "../../style/theme.scss";
  footer {
    background-color: $acmDark;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 112px;
    font-size: 24px;
    // padding-bottom: 333px;

    .acm-logo {
      filter: drop-shadow(0 2px 3px rgba(55, 146, 193, 0.5));
    }

    .footer-year {
      color: $acmLight;
      margin-right: 12px;
    }
    /* a {
      object {
        width: 48px;
        padding: 32px 12px 32px 12px;
      }
    } */
    .brand-em {
      color: $acmLight;
      margin-left: 12px;
    }
  }
</style>
