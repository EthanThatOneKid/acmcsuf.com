<script lang="ts">
  import BoardPicture from '$lib/components/board-member/board-picture.svelte';
</script>

<section class="testimony-container">
  <div class="testimony-inner-container">
    <h1 class="brand-header size-xl">Hear what our community has to say</h1>
    <div class="testimony-text">
      <div class="testimony-photo">
        <BoardPicture src="/assets/authors/placeholder.webp" color="var(acm-blue)" />
      </div>
      <blockquote>
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat."
        </p>
      </blockquote>
    </div>

    <div class="testimony-text">
      <div class="testimony-photo">
        <BoardPicture src="/assets/authors/placeholder.webp" color="var(acm-blue)" />
      </div>
      <blockquote>
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat."
        </p>
      </blockquote>
    </div>
  </div>
</section>

<style>
  section {
    display: grid;
  }
  section .testimony-inner-container {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
  }

  section .testimony-inner-container h1 {
    display: grid;
    align-items: center;
    text-align: center;
    margin: 0.3em;
  }
  section .testimony-inner-container .testimony-text {
    display: grid;
    align-items: center;
  }

  section .testimony-inner-container .testimony-text p {
    margin-left: 2em;
    margin-right: 2em;
  }

  section .testimony-inner-container .testimony-photo {
    display: grid;
    align-items: center;
    justify-self: center;
    margin: 2em;
  }
</style>
