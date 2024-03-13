<script lang="ts">
  import type { Color } from './colors';
  import ColorPill from './color-pill.svelte';
  import ColorID from './color-id.svelte';

  export let data: Color;
</script>

<div id={data.id} class="color-container size-md" style:--color={data.hex}>
  <ColorID {data} />:
  <ColorPill {data} />
</div>

<style>
  .color-container {
    border-left: 5px solid var(--color);
  }
</style>
