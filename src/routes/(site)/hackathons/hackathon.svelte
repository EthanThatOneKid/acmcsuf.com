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
  }

  .hackathon img {
    max-width: 100%;
    height: auto;
    margin-top: 1em;
  }
</style>
