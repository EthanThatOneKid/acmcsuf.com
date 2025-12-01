<script lang="ts">
  import type { Hackathon } from '$lib/public/hackathons';
  import BoardMember from '$lib/components/board-member/board-member.svelte';

  export let data: Hackathon;

  // Theme emoji mapping based on theme name
  const themeEmojiMap: Record<string, string> = {
    'Camping': '🏕️',
    'Cyberpunk': '🤖',
    'Party': '🎉',
    'Neon': '💜',
    'Space': '🚀',
  };

  $: themeEmoji = themeEmojiMap[data.theme] || '🎭';
</script>

<section class="hackathon" id={data.id}>
  <h2><a href="#{data.id}">{data.title}</a></h2>
  
  <div class="hackathon-meta">
    <span>📅 {data.date}</span>
    <span>📍 {data.location}</span>
    <span>{themeEmoji} {data.theme}</span>
  </div>

  <div class="hackathon-image-wrapper">
    <img src="/assets/hackathon-{data.id}.webp" alt="{data.title} website" />
  </div>

  <p class="description">{data.description}</p>

  <h3>Directors</h3>
  <div class="directors-container">
    {#each data.directors as director (director.name)}
      <div class="director-card">
        <BoardMember src={director.picture} alt="{director.name}" color="var(--acm-blue)" />
        <p class="names">{director.name}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  .hackathon {
    scroll-margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 1.5rem;
    overflow: hidden;
  }

  h2 {
    margin-bottom: 0.75rem;
  }

  h2 a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;
  }

  h2 a:hover {
    color: var(--acm-blue, #3b82f6);
  }

  h3 {
    margin-top: 1.5em;
    margin-bottom: 1rem;
  }

  .hackathon-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.95rem;
    opacity: 0.9;
  }

  /* Image wrapper for hover effects */
  .hackathon-image-wrapper {
    width: 100%;
    max-width: 800px;
    height: 560px;
    overflow: hidden;
    border-radius: 16px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .hackathon-image-wrapper:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }

  .hackathon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 16px;
  }

  .description {
    text-align: center;
    max-width: 45ch;
    margin-top: 1rem;
    line-height: 1.6;
  }

  .directors-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
  }

  .director-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .names {
    text-align: center;
    margin-top: 0.5rem;
  }

  @media (max-width: 768px) {
    .hackathon {
      padding: 1rem;
    }

    .hackathon-meta {
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }

    .hackathon-image-wrapper {
      max-width: 100%;
      height: 200px;
    }

    .description {
      max-width: 30ch;
    }

    .directors-container {
      gap: 20px;
    }
  }
</style>