<script lang="ts">
  import InstagramIcon from "@/components/icons/instagram.svelte";
  import DiscordIcon from "@/components/icons/discord.svelte";
  import LinkedInIcon from "@/components/icons/linkedin.svelte";
  import YouTubeIcon from "@/components/icons/youtube.svelte";
  import { links } from "../../lib/links";

  const socialLinks: {
    link: string;
    icon: any;
  }[] = [
    {
      link: links.instagram,
      icon: InstagramIcon,
    },
    {
      link: links.linkedin,
      icon: LinkedInIcon,
    },
    {
      link: links.youtube,
      icon: YouTubeIcon,
    },
    {
      link: links.discord,
      icon: DiscordIcon,
    },
  ];
</script>

<section class="social-media-links-section">
  <span class="container">
    {#each socialLinks as { link, icon }}
      <a
        href="{link}"
        class="social-link"
        target="_blank"
        rel="noopener norefferer"
      >
        <svelte:component this="{icon}" />
      </a>
    {/each}
  </span>
</section>

<style>
  .social-media-links-section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 24px;
  }

  .container {
    display: flex;
    width: 448px;
    justify-content: space-between;
  }

  .social-link :global(svg) {
    height: 64px;
    width: 64px;
  }

  .social-link :global(path) {
    fill: var(--acm-dark);
    transition: fill 0.25s ease-in-out;
  }

  .social-link:hover :global(path) {
    fill: var(--acm-blue);
  }

  @media (max-width: 639px) {
    .social-link :global(svg) {
      height: 48px;
      width: 48px;
    }
  }
</style>
