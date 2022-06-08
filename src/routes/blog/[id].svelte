<script lang="ts" context="module">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/internal';

  export async function load({ fetch, params }: LoadInput): Promise<LoadOutput> {
    const response = await fetch(`/blog/${params.id}.json`);
    const newsletter = await response.json();

    if (typeof newsletter?.id !== 'number') {
      return { status: 404 };
    }

    return { props: { post: newsletter } };
  }
</script>

<script lang="ts">
  import type { Newsletter } from './_query';
  import Spacing from '$lib/components/sections/spacing.svelte';
  import { readingTime } from '$lib/blog/utils';
  import { Temporal } from '@js-temporal/polyfill';
  import Labels from '$lib/components/blog/labels.svelte';
  import BlogBody from '$lib/blog/blog-body.svelte';

  export let post: Newsletter;
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<section>
  <h1 class="headers size-lg">{post.title}</h1>

  <Spacing --min="16px" --med="16px" --max="16px" />
  <img src={post.author.picture} alt="" />
  <Spacing --min="16px" --med="16px" --max="16px" />
  <p>
    by
    <a
      href={'https://github.com/' + post.author.displayname}
      target="_blank"
      rel="noopener noreferrer"
    >
      @{post.author.displayname}
    </a>
  </p>
  <p>
    {Temporal.Instant.from(post.createdAt).toLocaleString('en-US', {
      calendar: 'gregory',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })} •
    {readingTime(post.html)} min read
  </p>

  <Spacing --min="75px" --med="100px" --max="150px" />

  <div class="container">
    <BlogBody data={post.html} />
    <Labels data={post.labels} />
    <small class="ita">Read as TXT: <a href={`${post.url}.txt`}>{post.url}.txt</a></small>
  </div>

  <Spacing />
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0 24px;

    a {
      text-decoration: none;
      font-weight: 500;
      transition: 0.25s ease-in-out;

      &:hover {
        color: var(--acm-blue);
      }
    }
  }

  .container {
    text-align: left;
    padding: 4em 4em 3em;
    margin: 0;
    background-color: var(--acm-light);
    border-radius: 3em;
    filter: drop-shadow(0 8px 40px rgba(16, 19, 21, 0.1));
    -webkit-filter: drop-shadow(0 8px 40px rgba(16, 19, 21, 0.1));
    width: min(1000px, 70vw);
  }
  img {
    height: 100%;
    width: 5em;
    border-radius: 50%;
  }
</style>
