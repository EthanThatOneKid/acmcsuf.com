<script lang="ts">
  import InstagramIcon from "@/components/icons/instagram.svelte";
  import DiscordIcon from "@/components/icons/discord.svelte";
  import LinkedInIcon from "@/components/icons/linkedin.svelte";
  import YouTubeIcon from "@/components/icons/youtube.svelte";

  const socialLinks: {
    platform: string;
    link: string;
    icon: any;
  }[] = [
    {
      platform: "Instagram",
      link: "https://www.instagram.com/acmcsuf/",
      icon: InstagramIcon,
    },
    {
      platform: "Discord",
      link: "https://tinyurl.com/acm-csuf-discord/",
      icon: DiscordIcon,
    },
    {
      platform: "LinkedIn",
      link: "https://www.linkedin.com/company/acm-at-csuf/",
      icon: LinkedInIcon,
    },
    {
      platform: "YouTube",
      link: "https://www.youtube.com/channel/UCDMBj0o4V8Cpt0jgsZLNVVg",
      icon: YouTubeIcon,
    },
  ];
</script>

<section class="social-media-links-section">
  {#each socialLinks as { platform, link, icon } (platform)}
    <a href="{link}" class="social-link" target="_blank">
      <svelte:component this="{icon}" />
      {platform}
    </a>
  {/each}
</section>

<style>
  .social-media-links-section {
    display: flex;
    flex-direction: column;
    margin: 0 32px;
    align-items: center;
  }

  .social-link {
    cursor: pointer;
    border-radius: 1em;
    background-color: var(--acm-dark);
    padding: 8px 16px 8px 16px;
    margin: 1em 2em;
    color: var(--acm-light);
    text-decoration: none;
    border: 2px solid var(--acm-dark);
    font-size: var(--body-font-size);
    text-transform: lowercase;
    text-align: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 75%;
  }

  .social-link :global(svg) {
    width: 1.5em;
    height: 1.5em;
  }

  .social-link:hover {
    transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
    color: var(--acm-blue);
    background-color: var(--acm-light);
  }

  .social-link:hover :global(path) {
    transition: fill 0.25s ease-in-out;
    fill: var(--acm-blue);
  }

  @media screen and (min-width: 768px) {
    .social-media-links-section {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
    }

    .social-link {
      width: 40%;
      margin: 1em;
      font-size: var(--body-font-size);
    }
  }
</style>
