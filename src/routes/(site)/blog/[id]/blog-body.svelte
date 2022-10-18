<script lang="ts">
  import { onMount } from 'svelte';
  export let data = '';
  onMount(() => {
    let pre = document.querySelectorAll('pre');
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"
  ><rect
    x="128"
    y="128"
    width="336"
    height="336"
    rx="57"
    ry="57"
    fill="none"
    stroke="currentColor"
    stroke-linejoin="round"
    stroke-width="32"
  /><path
    d="M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="32"
  /></svg
>`;
    var svgCode = encodeURI(svg);
    for (let i = 0; i < pre.length; i++) {
      let parentDiv = pre[i].parentElement;
      parentDiv!.style.position = 'relative';
      let copyBtn = document.createElement('button');
      copyBtn.classList.add('copy-code');
      copyBtn.style.cssText =
        'position: absolute; padding: 1rem; top: 1rem; right: 1rem; outline: none; background-color: transparent; border:none; cursor: pointer';
      copyBtn.style.backgroundImage = 'url(data:image/svg+xml;utf8,' + svgCode + ')';
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
