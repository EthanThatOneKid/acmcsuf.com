<script lang="ts">
  import type { Color } from './colors';
  import { copy } from '$lib/public/copy/copy';

  export let data: Color;

  function copyColor() {
    copy(`var(${data.id})`, 'CSS variable copied to clipboard!', 'Failed to copy to clipboard!');
  }
</script>

<tr id={data.id} class="color-container size-md" style:--color={data.color ?? data.value}>
  <td><a class="color-id" href="#{data.id}"><code>{data.id}</code></a></td>
  <td>
    <button
      class="color-pill size-md"
      on:click={() => copyColor()}
      title="Click to copy the CSS variable to your clipboard."
      aria-label="Click to copy the CSS variable to your clipboard."
      ><code>{data.value}</code></button
    >
    {#if data.aliasOf}<sup><a class="alias" href="#{data.aliasOf}">alias↩</a></sup>{/if}
  </td>
</tr>

<style>
  .color-container {
    scroll-margin-top: 100px;
  }

  .color-container:target {
    animation: highlight 2s;
  }

  .color-container td:nth-child(1) {
    border-left: 5px solid var(--color);
  }

  .color-id {
    text-decoration-color: var(--color);
    margin: 0 0.5em;
  }

  .color-pill {
    background: none;
    border: none;
  }

  .color-pill:hover {
    text-decoration: underline;
    text-decoration-color: var(--color);
  }

  .alias {
    font-family: monospace;
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
