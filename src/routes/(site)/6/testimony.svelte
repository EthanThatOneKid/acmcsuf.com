<script lang="ts">
  import BoardPicture from '$lib/components/board-member/board-picture.svelte';
</script>

<section class="testimony-container">
  <div class="testimony-inner-container">
    <h1 class="brand-header size-xl">Hear what our community has to say</h1>
    <div class="testimony-text1">
      <div class="testimony-photo1">
        <BoardPicture src="/people/placeholder.webp" color="var(acm-blue)" />
      </div>
      <blockquote>
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat."
        </p>
      </blockquote>
    </div>

    <div class="testimony-text2">
      <div class="testimony-photo2">
        <BoardPicture src="/people/placeholder.webp" color="var(acm-blue)" />
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
  section .testimony-inner-container .testimony-text1,
  .testimony-text2 {
    display: grid;
    align-items: center;
  }

  section .testimony-inner-container .testimony-text1 p {
    margin-left: 2em;
    margin-right: 2em;
  }

  section .testimony-inner-container .testimony-text2 p {
    margin-left: 2em;
    margin-right: 2em;
  }

  section .testimony-inner-container .testimony-photo1 {
    display: grid;
    align-items: center;
    justify-self: center;
    margin: 2em;
  }

  section .testimony-inner-container .testimony-photo2 {
    display: grid;
    align-items: center;
    justify-self: center;
    margin: 2em;
  }

  @media screen and (min-width: 768px) {
    section {
      display: grid;
      max-width: 1280px;
      margin: 0 auto;
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
    section .testimony-inner-container .testimony-text1,
    .testimony-text2 {
      display: grid;
      align-items: center;
    }

    section .testimony-inner-container .testimony-text1 p {
      margin-left: 18em;
      margin-right: 12em;
      margin-top: -8.5em;
    }

    section .testimony-inner-container .testimony-text2 p {
      margin-left: 11em;
      margin-right: 19em;
      margin-top: -8.5em;
    }

    section .testimony-inner-container .testimony-photo1 {
      display: grid;
      align-items: center;
      justify-self: left;
      margin: 2em;
      margin-left: 7em;
    }

    section .testimony-inner-container .testimony-photo2 {
      display: grid;
      align-items: center;
      justify-self: right;
      margin: 2em;
      margin-right: 9em;
    }
  }
</style>
