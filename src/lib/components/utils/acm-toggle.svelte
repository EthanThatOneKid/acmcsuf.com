<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let initialValue = false;

  let value = initialValue;

  const dispatch = createEventDispatcher();
</script>

<div class="button b2" id="button-17">
  <input
    type="checkbox"
    class="checkbox"
    on:change={(event) => {
      value = !value;
      console.log({ event, value });
      dispatch('toggle', value);
    }}
  />
  <div class="knobs">
    <span />
  </div>
  <div class="layer" />
</div>
