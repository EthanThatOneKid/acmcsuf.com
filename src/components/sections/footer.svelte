<script lang="ts">
  import GitHubIcon from "@/components/icons/github.svelte";
  import { links } from "../../lib/links";
</script>

<footer>
  <div class="content">
    <p class="brand-light" style="font-weight: 500">
      &copy; 2021
      <span class="headers brand-light">
        acm<span class="brand-em brand-light">CSUF</span>
      </span>
    </p>

    <a
      href="{links.github}"
      class="github"
      target="_blank"
      rel="noopener norefferer"
    >
      <GitHubIcon />
    </a>
  </div>
</footer>

<style lang="scss">
  @import "static/theme.scss";
  footer {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: var(--acm-dark);
  }
  footer .content,
  footer .github {
    display: flex;
    align-items: center;
  }
  footer .content {
    justify-content: space-between;
    padding: 24px 0;
    margin: 0 24px;
    width: 1156px;
  }
  footer p {
    font-size: 18px;
  }
  footer .github :global(svg) {
    height: 32px;
    width: 32px;
  }
  footer .github :global(path) {
    fill: var(--acm-light);
    transition: fill 0.25s ease-in-out;
  }
  footer .github:hover :global(path) {
    fill: var(--acm-blue);
  }
  @media (max-width: 839px) {
    footer .github :global(svg) {
      height: 24px;
      width: 24px;
    }
    footer .content {
      padding: 12px 0;
    }
  }
</style>
