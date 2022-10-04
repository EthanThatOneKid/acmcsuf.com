<script lang="ts">
  export let data = '';
</script>

<div class="blog-body">
  {@html data}
</div>

<style lang="scss">
  @import './syntax-highlight.css';

  .blog-body {
    text-align: left;

    :global(p) {
      margin-bottom: 16px;
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
    :global(pre) {
      padding: 16px;
    }
    :global(code) {
      border-radius: 0.3em;
      padding: 0.1em 0.5em;
      margin: 0 0.3em;
    }
  }
</style>
