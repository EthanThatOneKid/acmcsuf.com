<script lang="ts">
  import type { Hackathon } from '$lib/public/hackathons';
  import BoardMember from '$lib/components/board-member/board-member.svelte';

  export let data: Hackathon;
</script>

<section class="hackathon" id={data.id}>
  <h2><a href="#{data.id}">{data.title}</a></h2>
  <p>📅 {data.date}</p>
  <p>📍 {data.location}</p>
  <p>🎭 {data.theme}</p>
  <img src="/assets/hackathon-{data.id}.webp" alt="{data.title} website" />
  <p>{data.description}</p>
  <h3>Directors</h3>
  <div class="directors-container">
    {#each data.directors as director}
      <div class="director-card">
        <BoardMember src={director.picture} alt="{director.name}}" color="var(--acm-blue)" />
        <p class="names">{director.name}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  .hackathon {
    scroll-margin-top: 100px;
    margin-bottom: 10em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h3 {
    margin-top: 2em;
    margin-bottom: 1rem;
  }

  .hackathon img {
    max-width: 50%;
    height: auto;
  }

  .hackathon p {
    text-align: center;
    max-width: 50ch;
    margin-top: 10px;
  }

  .directors-container {
    display: flex;
    justify-content: space-around;
    gap: 50px;
  }

  .director-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .names {
    text-align: center;
  }

  @media (max-width: 768px) {
    .hackathon p {
      text-align: center;
      max-width: 30ch;
      margin-top: 3px;
    }

    .directors-container {
      max-width: 475px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }
  }
</style>
