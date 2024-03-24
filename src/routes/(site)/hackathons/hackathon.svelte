<script lang="ts">
  import type { Hackathon } from '$lib/public/hackathons';

  export let data: Hackathon;
</script>

<section class="hackathon" id={data.id}>
  <h2><a href="#{data.id}">{data.title}</a></h2>
  <p>📅 {data.date}</p>
  <p>📍 {data.location}</p>
  <img src="/assets/hackathon-{data.id}.webp" alt="{data.title} website" />
</section>

<style>
  .hackathon {
    scroll-margin-top: 100px;
    margin-bottom: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: fadeIn 5s ease-in-out;

  }

  .hackathon img {
    max-width: 50%;
    height: auto;
    margin-top: 1em;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>
