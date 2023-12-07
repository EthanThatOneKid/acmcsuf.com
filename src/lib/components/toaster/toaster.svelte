<script lang="ts">
  import { fly } from 'svelte/transition';
  import { toasts, ToastType } from './toasts';
  import type { Toast } from './toasts';

  function toastHighlightStyle(toast: Toast): string {
    switch (toast.type) {
      case ToastType.Error:
        return `--error-rgb`;
      case ToastType.Success:
      default:
        return `--acm-${toast.teamId}-rgb`;
    }
  }
</script>

<section>
  {#each $toasts as toastItem (toastItem.id)}
    <div
      class="toast-item"
      class:error={toastItem.type === ToastType.Error}
      class:success={toastItem.type === ToastType.Success}
      in:fly|global={{ y: 20 }}
      out:fly|global={{ y: -20 }}
      style:--highlights={`var(${toastHighlightStyle(toastItem)})`}
    >
      <img src="/assets/capy-lucky.png" alt="acmCSUF Mascot: Chip the Capybara" />
      <p>{@html toastItem.content}</p>
    </div>
  {/each}
</section>

<style>
  :root {
    --error-rgb: 255, 67, 101;
    --info-rgb: 30, 108, 255;
  }

  section {
    position: fixed;
    z-index: 10000;
    bottom: 0;
    right: 0;
    width: 700px;
  }

  .toast-item {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 1.5em;
    margin: 32px 32px;
    padding: 2em;
    transition: all 0.25s ease-in-out;
    box-shadow: 0 6px 24px rgba(var(--highlights, --acm-general-rgb), 0.5);
    border: 3px solid rgb(var(--highlights, --acm-general-rgb));
    transition: 0.25s ease-in-out;
    border-radius: 20px;
    background-color: var(--acm-light);
  }

  .toast-item img {
    --img-width: 75px;
    width: var(--img-width);
    height: calc(var(--img-width) * 0.56);
    align-self: center;
  }

  @media screen and (max-width: 800px) {
    section {
      width: 100%;
    }
  }
</style>
