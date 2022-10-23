<script lang="ts">
  import { onMount } from 'svelte';
  export let data = '';
  onMount(() => {
    let pre = document.querySelectorAll('pre');
    for (let code of pre) {
      const parentDiv = code.parentElement;
      if (parentDiv) {
        parentDiv.style.position = 'relative';
      }
      const copyBtn = document.createElement('button');
      copyBtn.classList.add('copy-code');
      parentDiv?.appendChild(copyBtn);
    }
  });
</script>

<div class="blog-body">
  {@html data}
</div>

<style lang="scss">
  @import './syntax-highlight.css';

  .blog-body {
    text-align: left;

    :global(p),
    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4),
    :global(h5),
    :global(h6) {
      margin: 1.5rem 0 0.5rem;
    }

    :global(.copy-code) {
      position: absolute;
      padding: 1rem;
      top: 1rem;
      right: 1rem;
      outline: none;
      background-color: transparent;
      border: none;
      cursor: pointer;
      background-image: url('/assets/svg/copy-text.svg');
    }

    :global(code),
    :global(pre) {
      font-family: monospace;
      font-size: 1.2em;
      background-color: var(--acm-canvas);
      border-radius: 0.5em;
      overflow: auto;
      margin: 0.5em 0;
    }

    :global(blockquote) {
      margin: 0;
      padding: 0 1em;
      border-left: 0.25em solid #d0d7de;
    }

    :global(pre) {
      padding: 1em;
    }

    :global(code) {
      border-radius: 0.3em;
      padding: 0.1em 0.5em;
      margin: 0 0.3em;
    }

    :global(ul),
    :global(ol) {
      margin: 1.5rem 0 0.5rem;
      padding-left: 1.5rem;
    }

    :global(hr) {
      margin: 2rem 0;
    }
  }
</style>
