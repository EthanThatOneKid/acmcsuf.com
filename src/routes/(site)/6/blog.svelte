<script lang="ts">
  import AcmButton from '$lib/components/button/button.svelte';
  // import DATA from './data.json';
</script>

<section class="blog-container">
  <div class="blog-inner-container">
    <div class="blog-text">
      <h1 class="brand-header size-xl">Too boring for you?</h1>
      <p>How about you read what we have recently been talking about?</p>
      <div class="blog-card-container">
        <div class="blog-title">
          <!-- <DATA> -->
        </div>
      </div>
      <div class="read-more-button">
        <AcmButton text="Read More" link="/blog" redirect={true} />
      </div>
    </div>
  </div>
</section>

<style>
  section {
    display: grid;
  }

  section .blog-inner-container {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 1em;
  }

  section .blog-inner-container .blog-text {
    display: grid;
    align-items: center;
    text-align: center;
    gap: 1em;
  }
  section .blog-inner-container .blog-text .read-more-button {
    display: grid;
    justify-self: center;
  }
</style>
