<script lang="ts">
  import { onMount } from 'svelte';
  export let data = '';
  function observerCallback(body: HTMLBodyElement, copySvg: HTMLImageElement) {
    return (mutationList: Array<MutationRecord>) => {
      mutationList.forEach((mutation: MutationRecord) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          // handle class change
          copySvg.src = body?.classList.contains('light')
            ? '/assets/svg/copy-text.svg'
            : '/assets/svg/light/copy-text.svg';
        }
      });
    };
  }
  onMount(() => {
    const body: HTMLBodyElement | null = document.querySelector('body');

    for (let code of document.querySelectorAll('pre')) {
      const parentDiv: HTMLElement | null = code.parentElement;
      const copySvg: HTMLImageElement = document.createElement('img');
      copySvg.src = body?.classList.contains('light')
        ? '/assets/svg/copy-text.svg'
        : '/assets/svg/light/copy-text.svg';

      if (parentDiv) {
        parentDiv.classList.add('copy-code-parent');
      }

      if (body) {
        const observer = new MutationObserver(observerCallback(body, copySvg));
        observer.observe(body, { attributes: true });
      }

      const copyBtn: HTMLButtonElement = document.createElement('button');
      copyBtn.classList.add('copy-code');
      copySvg.classList.add('copy-code-icon');
      parentDiv?.appendChild(copySvg);
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

    :global(.copy-code-parent) {
      position: relative;
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
