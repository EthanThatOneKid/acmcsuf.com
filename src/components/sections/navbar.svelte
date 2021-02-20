<script lang="ts">
  export let segment: string;
  const menuItems: { title: string; slug: string }[] = [
    { title: "about", slug: "about" },
    // { title: "events", slug: "events" },
    { title: "paths", slug: "paths" },
    // { title: "nodeBuds", slug: "node-buds" },
    // { title: "connect", slug: "connect" },
  ];
</script>

<header>
  <a href="/" class="header-logo">
    <img src="assets/badges/acm-csuf-badge.svg" width="48" class="acm-logo" />
    <span class="brand-em">CSUF</span>
  </a>

  <!--   <a class="header-logo" href="/">
    <object
      width="48"
      height="48"
      type="image/svg+xml"
      data="assets/badges/acm-csuf-badge.svg"
      title="acm-csuf-logo"
    />
    <span class="brand-em">CSUF</span>
  </a> -->
  <nav>
    <ul class="headers">
      {#each menuItems as { title, slug } (slug)}
        <li>
          <a
            href={`/${slug}`}
            class={`navitem navitem-${slug}`}
            rel="prefetch"
            aria-current={segment === slug}
          >
            {title}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</header>

<style lang="scss">
  @import "../../style/theme.scss";

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 112px;
    width: 100%;
    box-shadow: 0 3px 6px rgba(33, 33, 33, 0.1);

    .header-logo {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-decoration: none;
      margin-left: 128px;
      color: $acmDark;

      .acm-logo {
        filter: drop-shadow(0 2px 3px rgba(55, 146, 193, 0.5));
      }

      /* object {
        width: 48px;
      } */

      span {
        font-size: 24px;
        margin-left: 12px;
        transition: color 0.25s ease-in-out;
      }
      &:hover {
        color: $acmBlue;
      }
    }

    nav {
      font-size: 24px;

      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        margin-right: 128px;

        li {
          a {
            color: $acmDark;
            text-decoration: none;
            margin-left: 64px;

            transition: color 0.25s ease;

            &:hover {
              color: $acmBlue;
            }

            &[aria-current="true"] {
              color: grey;
              pointer-events: none;
            }
          }
        }
      }
      @media screen and (max-width: $breakpoint) {
        ul {
          flex-direction: column;
        }
      }
    }
  }
</style>
