<script lang="ts">
  import { getPosts } from "../../lib/posts";
  const posts = getPosts();
</script>

<svelte:head>
  <title>acmCSUF | newsletters</title>
</svelte:head>

<div class="container">
  <h1>Newsletters</h1>
  <div class="article-container">
    {#if posts.length === 0}
      <p class="empty-message">
        Come back later when we have more newsletters!
      </p>
    {:else}
      {#each posts as post (post.slug)}
        <a href="{`/posts/${post.slug}`}">
          <article>
            <h2>{post.title}</h2>
            <p><b>{post.author.name}</b></p>
            <p>{post.description}</p>
          </article>
        </a>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .container {
    width: 100%;

    h1 {
      text-align: center;
    }

    .article-container {
      display: flex;
      flex-direction: column;
      justify-content: center;

      article {
        color: black;
        text-decoration: none;
        text-align: center;
      }

      .empty-message {
        width: 300px;
        margin: 2em;
        text-align: center;
        font-weight: bold;
      }
    }
  }
</style>
