<script lang="ts">
  import { fly } from 'svelte/transition';
  import { toasts, ToastType } from './toasts';
</script>

<section>
  {#each $toasts as toastItem (toastItem.id)}
    <div
      class="toast-item"
      class:error={toastItem.type === ToastType.Error}
      class:success={toastItem.type === ToastType.Success}
      class:info={toastItem.type === ToastType.Info}
      in:fly={{ y: 20 }}
      out:fly={{ y: -20 }}
      style:--highlights={`var(--acm-${toastItem.path}-rgb)`}
    >
      <img src="/assets/png/acm-shark.png" alt="acmCSUF Mascot: Frank the Shark" />
      <p>{@html toastItem.content}</p>
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
    right: 50%;
    transform: translateX(50%);
    min-width: min(390px, 100%);
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

  @media (min-width: 800px) {
    section {
      right: 0;
      transform: translateX(0);
    }
  }
</style>
