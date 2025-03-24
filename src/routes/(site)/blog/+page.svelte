<script lang="ts">
  import type { PageData } from './$types';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import LabelField from './labelfield.svelte';
  import { makeBlogPostsPageDataURL, makeBlogPostsPageURL } from '$lib/public/blog/urls';
  import BlogPostPreview from '$lib/components/blog/blog-post-preview.svelte';

  export let data: PageData;

  let selectedLabels: string[] = [...data.selectedLabels];

  async function filterPosts(event: CustomEvent) {
    selectedLabels = event.detail;

    const pageURL = makeBlogPostsPageURL(selectedLabels);
    history.replaceState({}, '', pageURL);

    const PageDataURL = makeBlogPostsPageDataURL(selectedLabels);
    const target = new URL(PageDataURL, location.origin);
    const response = await fetch(target.toString());
    const blogOutput = await response.json();

    if (blogOutput.posts) data.posts = blogOutput.posts;
  }
</script>

<svelte:head>
  <title>README | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<section class="main-header">
  <img src="/assets/readme-badge.svg" alt="README by acmCSUF" />
  <div>
    <h1 class="size-xxl">README</h1>
    <h2 class="size-md">by ACM at <b class="acm-blue">CSUF</b></h2>
  </div>
</section>

<section>
  <h2 class="subtitle acm-heavier size-md">
    The official ACM at CSUF blog.
    <a href="/feed.xml">
      <img src="assets/feed-icon.svg" alt="RSS feed logo" />
    </a>
  </h2>
</section>

<Spacing --min="110px" --med="125px" --max="150px" />

{#if data.posts.length > 0}
  <LabelField labels={data.labels} {selectedLabels} on:change={filterPosts}>
    <div slot="title">Filter by Tags</div>
    <div slot="reset-button">✖ Clear all</div>
  </LabelField>

  <section>
    <ul>
      {#each data.posts as post (post.id)}
        <li class="blog-post">
          <BlogPostPreview {post} {selectedLabels} />
        </li>
      {/each}
    </ul>
  </section>
{:else}
  <section>
    <h2 class="size-lg">There are no posts yet.</h2>
  </section>
{/if}

<Spacing --min="40px" --med="95px" --max="120px" />

<style lang="scss">
  .subtitle {
    a {
      display: inline-block;
      padding-left: 0;
      margin-top: 3vw;
      vertical-align: baseline;

      img {
        width: 18px;
        height: 18px;
      }
    }
  }

  .main-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    text-align: center;
  }

  section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 24px;

    * {
      transition: 0.25s ease-in-out;
    }

    div {
      h1 {
        font-weight: 550;
        height: 95px;
        line-height: 100px;
      }

      h2 {
        font-weight: 600;
        margin-left: 5px;
      }
    }

    img {
      max-width: 200px;
      width: 100%;
      height: auto;
      margin-bottom: 8px;
      margin-right: 2vw;
    }

    ul {
      list-style: none;
      display: grid;
      gap: 4em 3em;
      padding: 2em 1em;
      margin: 0 auto;
      max-width: 1550px;
      width: 90%;
    }
  }

  .blog-post {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
  }

  section ul li {
    overflow: hidden;
    background-color: rgba(56, 182, 255, 0.25);
    border-radius: 1em;
    max-width: 500px;
    box-shadow: 5px 5px 5px lightblue;
    cursor: pointer;
    transition: 0.25s ease-in-out;
  }

  section ul li:hover {
    background-color: rgba(56, 182, 255, 0.5);
    transform: scale(1.03);
  }

  @media (max-width: 850px) {
    .blog-post {
      height: auto;
      padding-bottom: 10px;
    }
  }

  @media (min-width: 851px) and (max-width: 1280px) {
    .blog-post {
      grid-template-columns: repeat(2, 1fr);
      height: 430px;
    }
  }

  @media (min-width: 1281px) {
    .blog-post {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
