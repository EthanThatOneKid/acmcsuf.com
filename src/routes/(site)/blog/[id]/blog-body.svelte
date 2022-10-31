<script lang="ts">
  import { onMount } from 'svelte';
  import BwIcon from '$lib/components/bw-icon/bw-icon.svelte';
  import { copy } from '$lib/public/copy/copy';

  export let data = '';

  onMount(() => {
    const body = document.querySelector('body');
    if (!body) return;

    for (const codeBlock of document.querySelectorAll('pre')) {
      codeBlock.parentElement?.classList.add('copy-code-parent');
      const copyBtn: HTMLButtonElement = document.createElement('button');
      copyBtn.classList.add('copy-code');
      copyBtn.addEventListener('click', () => {
        copy(codeBlock.textContent ?? '', 'Code copied to clipboard', 'Failed to copy code');
      });

      new BwIcon({
        target: copyBtn,
        props: {
          src: '/assets/svg/copy-text.svg',
          alt: 'Copy code',
        },
      });

      codeBlock.parentElement?.appendChild(copyBtn);
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

    :global(.copy-code-parent) {
      position: relative;
    }

    :global(.copy-code) {
      position: absolute;
      padding: 1rem;
      top: 0;
      right: 0;
      outline: none;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }

    :global(.copy-code-icon) {
      position: absolute;
      top: 1rem;
      width: 2em;
      height: 2em;
      right: 1rem;
      border: none;
      cursor: pointer;
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
