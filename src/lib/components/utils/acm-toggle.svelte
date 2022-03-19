<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  export let initialValue = false;

  const dispatch = createEventDispatcher();
  let input: HTMLInputElement;
  let value = initialValue;

  function toggle() {
    dispatch('toggle', (value = !value));
  }

  onMount(() => {
    input.addEventListener('change', toggle);
    return () => input.removeEventListener('change', toggle);
  });
</script>

<label>
  <input type="checkbox" bind:this={input} />
  <slot />
</label>
