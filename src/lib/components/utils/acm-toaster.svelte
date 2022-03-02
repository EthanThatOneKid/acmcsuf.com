<script lang="ts">
  import { fly } from 'svelte/transition';
  import { toasts } from '$lib/stores/toasts';
</script>

<section>
  {#each $toasts as toastItem (toastItem.id)}
    <div
      class="toast-item"
      in:fly={{ x: 20, y: 20 }}
      out:fly={{ x: 20, y: -20 }}
      style={`--highlights: var(--${toastItem.type}-rgb)`}>
      {@html toastItem.content}
    </div>
  {/each}
</section>

<style>
  :root {
    --success-rgb: 157, 231, 53;
    --error-rgb: 255, 67, 101;
    --info-rgb: 30, 108, 255;
  }

  section {
    position: fixed;
    z-index: 10000;
    bottom: 0;
    right: 0;
    visibility: var(--visibility, inherit);
  }

  .toast-item {
    margin: 32px 32px;
    padding: 2em;
    box-shadow: 0 6px 18px rgba(var(--highlights, --general-rgb), 0.25);
    transition: all 0.25s ease-in-out;
    border-radius: 30px;
    border: 2px solid var(--acm-dark);
    background-color: var(--acm-light);
  }
</style>
