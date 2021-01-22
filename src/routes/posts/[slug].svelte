<script context="module" lang="ts">
  import { getPostBySlug } from "../../lib/posts";
  export function preload({ params }) {
    const post = getPostBySlug(params.slug);
    return { post };
  }
</script>

<script lang="ts">
  import MarkdownDocument from "@/components/sections/markdown-document.svelte";
  import type { BlogPost } from "../../lib/posts";
  export let post: BlogPost;
</script>

<MarkdownDocument html={post.html} />
