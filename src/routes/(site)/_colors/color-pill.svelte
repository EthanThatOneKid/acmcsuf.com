<script lang="ts">
  import type { Color } from './colors';
  import { copy } from '$lib/public/copy/copy';

  export let data: Color;

  function copyColor() {
    copy(`var(${data.id})`, 'Copied color to clipboard', 'Failed to copy color to clipboard');
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-to-interactive-role -->
<code
  role="button"
  tabindex="0"
  class="color-pill"
  style:--color={data.hex}
  on:click={() => copyColor()}>{data.hex} ({data.rgb.join(', ')})</code
>

<style>
  .color-pill {
    text-decoration: underline;
    text-decoration-color: var(--color);
  }
</style>
