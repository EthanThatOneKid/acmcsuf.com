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
  <img src="/assets/readme-logomark.svg" alt="README by acmCSUF" />

  <div>
    <h1 class="size-xxl">README</h1>
    <h2 class="size-md">by ACM at <b class="acm-blue">CSUF</b></h2>
  </div>
</section>

<section>
  <h2 class="subtitle headers size-md">
    The official ACM at CSUF blog.<a href="/feed.xml"
      ><img src="assets/badges/feed-icon.svg" alt="RSS feed logo" /></a
    >
  </h2>
</section>

<Spacing --min="175px" --med="200px" --max="200px" />

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
      padding-left: 0em;
      margin-top: 3vw;
      vertical-align: baseline;

      img {
        width: 18px;
        height: 18px;
      }
    }
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
      padding: 3em 4em 2.5em;
      margin: 0;
      border-radius: 3em;
      width: min(1000px, 70vw);

      li {
        cursor: pointer;
        background-color: rgba(56, 182, 255, 0.25);
        border-radius: 1em;
        margin: 2em 0;

        &:hover {
          background-color: rgba(56, 182, 255, 0.5);
        }
      }
    }
  }

  @media (max-width: 600px) {
    .main-header {
      flex-direction: column;

      div h2 {
        text-align: center;
      }
    }

    .subtitle {
      text-align: center;
      padding-top: 1em;
    }
  }

  @media (max-width: 600px) {
    .main-header {
      flex-direction: column;

      div h2 {
        text-align: center;
      }
    }

    .subtitle {
      text-align: center;
      padding-top: 1em;
    }
  }

  @media (max-width: 900px) {
    section {
      ul {
        padding: 1em 2.5em;

        li {
          border-radius: 1.5em;
        }
      }
    }
  }
</style>
