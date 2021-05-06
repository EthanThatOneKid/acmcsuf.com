<script lang="ts">
  import GitHubIcon from "@/components/icons/github.svelte";
</script>

<footer>
  <span class="year">&copy; 2021</span>
  <img
    src="assets/png/acm-csuf-badge.png"
    alt="acmCSUF logo"
    width="48"
    class="acm-logo"
  />
  <span class="brand-em">CSUF</span>
  <a class="repo-link" href="https://github.com/EthanThatOneKid/acmcsuf.com">
    <GitHubIcon />
  </a>
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
    filter: drop-shadow(0 5px 5px rgba(55, 146, 193, 0.5));
  }

  footer .year {
    color: var(--acm-light);
    margin-right: 12px;
  }

  footer .brand-em {
    color: var(--acm-light);
    margin-left: 12px;
  }

  footer .repo-link {
    position: absolute;
    right: 2em;
  }

  footer .repo-link :global(svg):hover {
    filter: drop-shadow(0 10px 10px rgba(55, 146, 193, 0.5));
  }

  @media screen and (max-width: 768px) {
    footer .repo-link :global(svg) {
      display: none;
    }
  }
</style>
