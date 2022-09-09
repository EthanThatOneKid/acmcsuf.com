<script>
  import { tick } from 'svelte';

  export let relative = true;

  let active = true;

  async function click() {
    await tick();
    active = !active;
  }
</script>

<span on:click={click} class:relative>
  <slot name="label" />

  {#if active}
    <div class="confetti">
      <slot />
    </div>
  {/if}
</span>

<style>
  .relative {
    position: relative;
  }

  .relative .confetti {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .confetti {
    pointer-events: none;
  }
</style>
