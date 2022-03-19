<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  export let checked: boolean;

  const dispatch = createEventDispatcher();
  let input: HTMLInputElement;

  function toggle(event: Event) {
    dispatch('toggle', (checked = (event.target as typeof input).checked));
  }

  onMount(() => {
    input.addEventListener('change', toggle);
    return () => input.removeEventListener('change', toggle);
  });
</script>

<label>
  <input type="checkbox" bind:this={input} bind:checked />
  <slot />
</label>
