<script lang="ts">
  import { onMount } from 'svelte';

  // Back to top button visibility
  let showBackToTop = false;

  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onMount(() => {
    function handleScroll() {
      showBackToTop = window.scrollY > 500;
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<button
  class="back-to-top"
  class:visible={showBackToTop}
  on:click={scrollToTop}
  aria-label="Back to top"
>
  ↑
</button>

<style>
  /* Back to top button */
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #00b0ff;
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 176, 255, 0.4);
    z-index: 1000;
  }
  .back-to-top:hover {
    background: #00c8ff;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 176, 255, 0.5);
  }
  .back-to-top.visible {
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 768px) {
    .back-to-top {
      bottom: 1.5rem;
      right: 1.5rem;
      width: 45px;
      height: 45px;
      font-size: 1.25rem;
    }
  }
</style>
