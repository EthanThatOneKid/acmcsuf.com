<script lang="ts">
  export let segment: string;
  const menuItems: { title: string; slug: string }[] = [
    { title: "about", slug: "about" },
    { title: "events", slug: "events" },
    { title: "paths", slug: "paths" },
    { title: "node buds", slug: "node-buds" },
    { title: "connect", slug: "connect" },
  ];
</script>

<header>
  <a class="header-logo" href="/">
    <object
      width="40"
      height="40"
      type="image/svg+xml"
      data="assets/badges/acm-csuf-badge.svg"
      title="acm-csuf-logo"
    />
    <span class="brand-em">CSUF</span>
  </a>
  <nav>
    <ul>
      {#each menuItems as { title, slug } (slug)}
        <li>
          <a
            href={`/${slug}`}
            class={`navitem navitem-${slug}`}
            rel="prefetch"
            aria-current={segment === slug}>
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
    padding: 32px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);

    .header-logo {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 0.15em;
      text-decoration: none;
      color: $acmDark;

      object {
        width: 48px;
      }
      span {
        font-size: 24px;
        margin-left: 0.25em;
      }
      &:hover {
        transition: color 0.33s;
        color: $acmBlue;
      }
    }

    nav {
      margin-right: 0.15em;

      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;

        li {
          padding: 10px;

          a {
            color: $acmDark;
            text-decoration: none;
            padding: 5px 10px 5px 10px;

            &:hover {
              transition: color 0.33s;
              color: $acmPink;
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
