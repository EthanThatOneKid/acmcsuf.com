<script lang="ts">
  export let segment: string;
  const menuItems = [
    { title: "about", slug: "about" },
    { title: "events", slug: "events" },
    { title: "paths", slug: "paths" },
    {
      title: "<span>node</span>Buds",
      slug: "nodebuds",
    },
    { title: "connect", slug: "connect" },
  ];
</script>

<nav>
  <input type="checkbox" id="navToggle" />
  <div class="content">
    <a href="/" class="full-logomark">
      <img
        src="assets/badges/general.svg"
        width="48"
        class="logo-badge"
        alt="acmCSUF badge"
      />
      <span class="logo-text brand-em">CSUF</span>
    </a>

    <ul class="pages">
      {#each menuItems as { title, slug } (slug)}
        <li>
          <a
            href="{`/${slug}`}"
            class="{`page page-${slug}`} headers"
            rel="prefetch"
            aria-current="{segment === slug}"
          >
            {@html title}
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <label for="navToggle" class="menu">
    <div class="menuLine"></div>
    <div class="menuLine"></div>
    <div class="menuLine"></div>
  </label>
</nav>

<style>
  nav {
    position: fixed;
    display: flex;
    z-index: 100;
    width: 100%;
    justify-content: center;
    background-color: var(--acm-light);
    filter: drop-shadow(0 2px 8px rgba(16, 19, 21, 0.1));
    -webkit-filter: drop-shadow(0 2px 8px rgba(16, 19, 21, 0.1));
  }

  nav .content,
  nav .full-logomark,
  nav .pages {
    display: flex;
    align-items: center;
  }

  nav li,
  nav a {
    list-style: none;
    text-decoration: none;
  }

  nav .content {
    justify-content: space-between;
    padding: 24px 0;
    margin: 0 24px;
    width: 1156px;
  }

  nav .full-logomark .logo-badge {
    filter: drop-shadow(0 1.5px 4.5px rgba(44, 145, 198, 0.5));
    -webkit-filter: drop-shadow(0 1.5px 4.5px rgba(44, 145, 198, 0.5));
  }

  nav .full-logomark .logo-text {
    font-size: 24px;
    padding-left: 8px;
  }

  nav .pages a {
    font-size: 18px;
    margin-left: 64px;
    transition: color 0.25s ease-in-out;
  }

  nav .page-about:hover,
  nav .page-about[aria-current="true"],
  nav .page-events:hover,
  nav .page-events[aria-current="true"],
  nav .page-paths:hover,
  nav .page-paths[aria-current="true"],
  nav .page-connect:hover,
  nav .page-connect[aria-current="true"] {
    color: var(--acm-blue);
  }

  nav .page-nodebuds {
    font-weight: 700;
  }

  nav .page-nodebuds:hover,
  nav .page-nodebuds[aria-current="true"] {
    color: var(--acm-red);
  }

  #navToggle,
  nav .menu {
    display: none;
  }

  nav .menu {
    position: absolute;
    z-index: 100;
    top: 50%;
    transform: translateY(-50%);
    right: 18px;
    cursor: pointer;
  }

  nav .menu .menuLine {
    width: 24px;
    height: 2px;
    margin: 6px;
    border-radius: 8px;
    background-color: var(--acm-dark);
    transition: all 0.25s ease-in-out;
  }

  @media (max-width: 839px) {
    nav .content {
      padding: 12px 0;
    }

    nav .pages {
      position: fixed;
      z-index: 90;
      top: 0;
      right: 0;
      width: 100vw;
      height: 0;
      flex-direction: column;
      justify-content: space-evenly;
      overflow: hidden;
      background-color: var(--acm-light);
      transition: all 0.25s ease-in-out;
    }

    nav .pages a {
      margin: 0;
    }

    nav .menu {
      display: block;
    }

    nav :checked ~ .content .pages {
      height: 100vh;
    }

    nav :checked ~ .menu .menuLine:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    nav :checked ~ .menu .menuLine:nth-child(2) {
      opacity: 0;
    }

    nav :checked ~ .menu .menuLine:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
</style>
