<script lang="ts">
  import type { Color } from './colors';
  import { copy } from '$lib/public/copy/copy';

  export let data: Color;

  function copyColor() {
    copy(`var(${data.id})`, 'CSS variable copied to clipboard!', 'Failed to copy to clipboard!');
  }
</script>

<tr class="color-container size-md" style:--color={data.color ?? data.value}>
  <td><a id={data.id} class="color-id" href="#{data.id}"><code>{data.id}</code></a></td>
  <td>
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-to-interactive-role -->
    <code role="button" tabindex="0" class="color-pill" on:click={() => copyColor()}
      >{data.value}</code
    >
    {#if data.aliasOf}<sup><a class="alias" href="#{data.aliasOf}">alias↩</a></sup>{/if}
  </td>
</tr>

<style>
  .color-container:has(.color-id:target) {
    animation: highlight 2s;
  }

  .color-container td:nth-child(1) {
    border-left: 5px solid var(--color);
  }

  .color-id {
    scroll-margin-top: 100px;
    text-decoration: none;
  }

  .color-pill {
    text-decoration: underline;
    text-decoration-color: var(--color);
  }

  .alias {
    font-family: monospace;
    text-decoration: underline;
    text-decoration-color: var(--color);
  }

  @keyframes highlight {
    0% {
      background-color: var(--color);
    }

    100% {
      background-color: transparent;
    }
  }
</style>
