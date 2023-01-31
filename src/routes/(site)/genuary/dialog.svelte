<script lang="ts">
  let modal: HTMLDialogElement;

  function openModal() {
    modal.showModal();
  }

  function closeModal() {
    modal.close();
  }
</script>

<span on:click={openModal} on:keydown={openModal}>
  <slot name="opener" />
</span>

<dialog class="modal" bind:this={modal}>
  <slot name="content" />
  <span on:click={closeModal} on:keydown={closeModal}>
    <slot name="closer" />
  </span>
</dialog>

<style lang="scss">
  .modal {
    max-width: 50ch;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    & > * {
      margin: 0 0 0.5rem 0;
    }
  }

  .modal::backdrop {
    background: rgb(0 0 0 / 0.4);
  }
</style>
