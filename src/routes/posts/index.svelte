<script lang="ts">
  import { getPosts } from "../../lib/posts";
</script>

<h1>Blog</h1>
{#each getPosts() as post (post.metadata.slug)}
  <article>
    <!-- link article to /posts/$permalink -->
    <a href={`/posts/${post.metadata.slug}`}>
      <h2>{post.metadata.title}</h2>
      <p>{post.metadata.description}</p>
    </a>
  </article>
{/each}
