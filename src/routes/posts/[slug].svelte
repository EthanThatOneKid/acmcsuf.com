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

<div class="document-wrapper">
  <section class="document-meta">
    <h1>{post.metadata.title}</h1>
    {#if post.metadata.author !== undefined}
      <p class="document-author">
        {#if post.metadata.author.picture !== undefined}
          <img
            src={post.metadata.author.picture}
            alt={`Picture of ${post.metadata.author.name}.`}
          />
        {/if}
        <span>{post.metadata.author.name}</span>
      </p>
    {/if}
    {#if post.metadata.date !== undefined}
      <date>{post.metadata.date}</date>
    {/if}
    {#if post.metadata.tags !== undefined}
      {#each post.metadata.tags as tagItem (tagItem)}
        <span class={`tag ${tagItem}-tag`}>{tagItem}</span>
      {/each}
    {/if}
  </section>
  <MarkdownDocument html={post.html} />
</div>

<style lang="scss">
  .document-wrapper {
    padding: 69px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    .document-meta {
      display: flex;
      align-items: left;

      .document-author {
        img {
        }
        p {
        }
      }
    }
  }
</style>
