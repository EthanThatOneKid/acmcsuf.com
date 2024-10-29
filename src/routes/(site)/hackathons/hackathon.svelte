<script lang="ts">
  import type { Hackathon } from '$lib/public/hackathons';
  import BoardMember from '$lib/components/board-member/board-member.svelte';

  export let data: Hackathon;
</script>
<div class="all">
<section class="hackathon" id={data.id}>
  <h2><a href="#{data.id}">{data.title}</a></h2>
  <p>📅 {data.date}</p>
  <p>📍 {data.location}</p>
  <p>🎭 {data.theme}</p>
  <img src="/assets/hackathon-{data.id}.webp" alt="{data.title} website" />
  <p>{data.description}</p>
  <h3>Directors</h3>
  <div class="container">
    {#each data.directors as director}
      <div class="director-card">
          <BoardMember src={'${director.picture}'} alt="{director.name}}" />
        <div class="names">
          <p>{director.name}</p>
        </div>
      </div>
    {/each}
  </div>  
</section>
</div>
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

  .container {
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
    .container {
      max-width: 475px;
      flex-direction: column; /* Stack items vertically */
      justify-content: center; /* Align items vertically in the center */
      align-items: center;     /* Center items horizontally */
      gap: 20px;               /* Adjust gap for smaller screens */
    }
  }

</style>
