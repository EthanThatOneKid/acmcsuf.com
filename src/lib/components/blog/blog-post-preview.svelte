<script lang="ts">
  import type { BlogPost } from '$lib/public/blog/types';
  import { makeBlogPostPageUrl } from '$lib/public/blog/urls';
  import { readingTime } from '$lib/public/blog/utils';
  import { Temporal } from '@js-temporal/polyfill';
  import Labels from '$lib/components/blog/labels.svelte';
  import { copy } from '$lib/public/copy/copy';
  import BwIcon from '$lib/components/bw-icon/bw-icon.svelte';

  export let post: BlogPost;
  export let selectedLabels: string[];
</script>

<div class="post">
  <a href={makeBlogPostPageUrl(post.id)}>
    <div class="author">
      <a class="author-avatar" href={post.author.url}>
        <img src={post.author.picture} alt="" />
      </a>
      <div>
        <a href={post.author.url}
          >{#if post.author.fullname}
            {post.author.fullname}
          {:else}
            @{post.author.displayname}
          {/if}</a
        >
      </div>
      <button
        class="clipboard-btn"
        on:click={(ev) => {
          ev.preventDefault();
          copy(
            makeBlogPostPageUrl(post.id),
            'Copied post link to clipboard!',
            'Failed to copy post link to clipboard!',
            'general'
          );
        }}
      >
        <BwIcon src="/assets/svg/copy-link.svg" alt="copy link" />
      </button>
    </div>
    <a href={makeBlogPostPageUrl(post.id)}>
      <h2 class="headers">{post.title}</h2>
    </a>
    <div class="markdown-body">
      {@html post.html}
    </div>
    <p class="read-time">
      {post.createdAt &&
        Temporal.Instant.from(post.createdAt).toLocaleString('en-US', {
          calendar: 'gregory',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })} •
      {readingTime(post.html)} min read
      <Labels data={post.labels} {selectedLabels} />
    </p>
  </a>
</div>

<style>
  .post {
    padding: 2em;
  }

  a {
    text-decoration: none;
  }

  .author a:hover,
  a h2:hover {
    text-decoration: underline;
  }

  .author {
    display: flex;
    flex-direction: row;
    margin-bottom: 1em;
    align-items: center;
  }

  .author a {
    padding: 0;
    font-weight: 600;
  }

  .author div {
    display: flex;
    flex-direction: column;
  }

  .author img {
    border-radius: 50%;
    width: 2.5em;
    height: 100%;
    margin-right: 1em;
  }
  .markdown-body {
    max-height: 100px;
    overflow: hidden;
    margin: 16px 0;
    mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  }

  .read-time {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 1em;
    gap: 1em;
  }

  .clipboard-btn {
    display: flex;
    align-items: center;
    margin-left: auto;
    border: none;
    background-color: transparent;
    color: var(--text-color);
  }
</style>
