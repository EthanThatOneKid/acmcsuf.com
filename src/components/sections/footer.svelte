<footer>
  <span class="footer-year">&copy; 2021</span>
  <object
    type="image/png"
    data="assets/badges/PNG/acm-csuf-badge.png"
    title="acm-csuf-logo"
  />
  <span class="brand-em">CSUF</span>
</footer>

<style lang="scss">
  @import "../../style/theme.scss";
  footer {
    background-color: $acmDark;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 333px;

    .footer-year {
      color: $acmLight;
    }
    object {
      width: 48px;
      padding: 32px 12px 32px 12px;
    }
    .brand-em {
      color: $acmLight;
    }
  }
</style>
