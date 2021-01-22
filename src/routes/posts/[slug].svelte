<script context="module" lang="ts">
  import { getPostBySlug } from "../../lib/posts";
  import { highlight } from "../../actions/use-highlight";
  export function preload({ params }) {
    const post = getPostBySlug(params.slug);
    return { post };
  }
</script>

<script lang="ts">
  import type { BlogPost } from "../../lib/posts";
  export let post: BlogPost;
</script>

<div id="markdown-root" use:highlight>
  {@html post.html}
</div>

<style lang="scss">
  @import "../../style/markdown.scss";
</style>
