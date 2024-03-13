<script lang="ts">
  import type { Color } from './colors';
  import { copy } from '$lib/public/copy/copy';

  export let data: Color;

  function copyColor() {
    copy(`var(${data.id})`, 'CSS variable copied to clipboard!', 'Failed to copy to clipboard!');
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-to-interactive-role -->
<code role="button" tabindex="0" class="color-pill" on:click={() => copyColor()}>{data.value}</code>
{#if data.aliasOf}<sup><a class="alias" href="#{data.aliasOf}">alias↩</a></sup>{/if}

<style>
  .color-pill {
    text-decoration: underline;
    text-decoration-color: var(--color);
  }

  .alias {
    font-family: monospace;
    text-decoration: underline;
    text-decoration-color: var(--color);
  }
</style>
