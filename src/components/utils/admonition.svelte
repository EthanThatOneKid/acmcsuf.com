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
        <span class="brand-em brand-alert">ALERT</span>{": "}
        <slot><span class="size-xs">{text}</span></slot>
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
    margin: 0 16px;

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      text-decoration: none;
      border-radius: 24px;
      padding: 12px 24px;
      width: min(700px, calc(70% + 100px));
      background-color: var(--acm-dark);
      color: var(--acm-light);

      img {
        width: 125px;
        height: 125px;
        padding-bottom: 1rem;
      }

      p {
        padding-left: 0;
        padding-bottom: .5rem;
      }
    }
  }

  @media (min-width: 840px) {
    .wrapper {
      .content {
        padding: 24px 48px;
        flex-direction: row;

        img {
          width: 150px;
          height: 150px;
          padding-bottom: 0;
        }

        p {
          padding-left: 3rem;
          padding-bottom: 0;
        }
      }
    }
  }
</style>
