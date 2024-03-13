<script lang="ts">
  import type { Color } from './colors';
  import ColorPill from './color-pill.svelte';
  import ColorID from './color-id.svelte';

  export let data: Color;
</script>

<tr class="color-container size-md" style:--color={data.color ?? data.value}>
  <td><ColorID {data} />:</td>
  <td><ColorPill {data} /></td>
</tr>

<style>
  .color-container td:nth-child(1) {
    border-left: 5px solid var(--color);
  }
</style>
