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
  <div class="directors-list">
    {#each data.directors as director}
      <BoardMember src={'${director.picture}'} alt="{director.name}}" />
      <p>{director.name}</p>
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

  .hackathon img {
    max-width: 50%;
    height: auto;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .hackathon p {
    text-align: center;
    max-width: 50ch;
  }
</style>
