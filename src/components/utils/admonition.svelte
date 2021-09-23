<script lang="ts">
  export let path: string = "general";
  export let text: string = "";
  export let expiration: number;

  const isExpired = new Date().valueOf() > expiration;
  const icon = `../assets/badges/${path}.svg`;
</script>

{#if !isExpired}
  <div class="wrapper">
    <div class="content">
      <img src="{icon}" alt="Admontion icon" />
      <p class="brand-light">
        <span class="brand-em brand-alert">Alert</span>{": "}
        <slot><span>{text}</span></slot>
      </p>
    </div>
  </div>
{/if}

<style lang="scss">
  @import "static/theme.scss";

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      text-decoration: none;
      border-radius: 12px;
      padding: 12px 24px;
      width: min(700px, calc(70% + 100px));
      background-color: var(--acm-dark);
      color: var(--acm-light);

      img {
        width: 200px;
        height: 200px;
      }

      p {
        padding: 2rem;
      }
    }
  }

  @media (min-width: 700px) {
    .wrapper {
      .content {
        flex-direction: row;

        img {
          width: 125px;
          height: 125px;
        }
      }
    }
  }
</style>
