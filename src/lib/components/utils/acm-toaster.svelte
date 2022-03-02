<script lang="ts">
  import { toasts, dismissToast } from '$lib/stores/toasts';
  import { writable } from 'svelte/store';
</script>

<section>
  {#each $toasts as toastItem (toastItem.id)}
    <div class="toast-item" style={`--highlights: var(--${toastItem.type}-rgb)`}>
      {@html toastItem.content}
      <button on:click={() => dismissToast(toastItem.id)}>X</button>
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
    margin: 32px 64px;
    padding: 0;
    box-shadow: 0 6px 18px rgba(var(--highlights, --general-rgb), 0.25);
    transition: all 0.15s ease-in-out;
    border-radius: 30px;
    border: 2px solid var(--acm-dark);
    background-color: var(--acm-light);
  }
</style>
