<script lang="ts">
</script>

<section>
  <img
    src="assets/png/why-join-illustration.png"
    alt="Social event with acmCSUF club members."
  />
  <div class="right-content">
    <h2 class="size-xl">Why should students join?</h2>
    <p class="size-l">
      We help kickstart student's journeys through the tech industry by
      providing workshops that enable growth of technical ability, a community
      of techies open to building personal and professional connections, and a
      mentorship program full of enthusiastic upperclassmen ready prepare
      underclassmen for success.
    </p>
  </div>
</section>

<style lang="scss">
  @import "static/theme.scss";

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 24px;
  }

  section .right-content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    justify-content: center;
    max-width: 680px;
  }

  section .right-content p {
    padding-top: 16px;
  }

  section img {
    max-width: 350px;
    margin-right: 120px;
    filter: drop-shadow(0 10px 40px rgba(44, 145, 198, 0.5));
  }

  @media (max-width: 839px) {
    section {
      flex-direction: column;
    }

    section img {
      margin-right: 0;
      margin-bottom: 32px;
    }

    section .right-content {
      align-items: center;
      text-align: center;
    }
  }

  @media (max-width: 559px) {
    section img {
      max-width: 220px;
    }
  }
</style>
