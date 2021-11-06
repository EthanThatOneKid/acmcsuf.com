<script lang="ts">
  import InstagramIcon from '$lib/components/icons/instagram.svelte';
  import DiscordIcon from '$lib/components/icons/discord.svelte';
  import LinkedInIcon from '$lib/components/icons/linkedin.svelte';
  import YouTubeIcon from '$lib/components/icons/youtube.svelte';

  const socialLinks: {
    link: string;
    icon: any;
  }[] = [
    {
      link: '/instagram',
      icon: InstagramIcon,
    },
    {
      link: '/linkedin',
      icon: LinkedInIcon,
    },
    {
      link: '/youtube',
      icon: YouTubeIcon,
    },
    {
      link: '/discord',
      icon: DiscordIcon,
    },
  ];
</script>

<section class="social-media-links-section">
  <span class="container">
    {#each socialLinks as { link, icon }}
      <a href={link} class="social-link" target="_blank" rel="noopener norefferer">
        <svelte:component this={icon} />
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
