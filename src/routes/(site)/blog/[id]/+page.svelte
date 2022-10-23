<script lang="ts">
  import type { PageData } from './$types';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import { readingTime } from '$lib/public/blog/utils';
  import { Temporal } from '@js-temporal/polyfill';
  import Labels from '$lib/components/blog/labels.svelte';
  import BlogBody from './blog-body.svelte';
  import { onMount } from 'svelte';
  import { copy } from '$lib/public/copy/copy';
  export let data: PageData;
  onMount(() => {
    const copyBtns = document.querySelectorAll('.copy-code');
    for (let button of copyBtns) {
      button.addEventListener('click', (event: Event) => {
        const content =
          (event.target as HTMLElement).offsetParent?.attributes.getNamedItem(
            'data-snippet-clipboard-copy-content'
          )?.value ?? '';
        copy(content, 'Copied', 'blog', 'Failed to copy');
      });
    }
  });
</script>

<svelte:head>
  <title>{data.post.title}</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<section>
  <h1 class="headers size-lg">{data.post.title}</h1>
  <Spacing --min="16px" --med="16px" --max="16px" />
  <img src={data.post.author.picture} alt="" />
  <Spacing --min="16px" --med="16px" --max="16px" />
  <p>
    by
    <a
      href={'https://github.com/' + data.post.author.displayname}
      target="_blank"
      rel="noopener noreferrer"
    >
      @{data.post.author.displayname}
    </a>
  </p>
  <p>
    {Temporal.Instant.from(data.post.createdAt).toLocaleString('en-US', {
      calendar: 'gregory',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })} •
    {readingTime(data.post.html)} min read
  </p>

  <Spacing --min="40px" --med="40px" --max="40px" />

  <div class="container">
    <BlogBody data={data.post.html} />
    <Labels data={data.post.labels} />
    <small class="ita"
      >Read as TXT: <a target="_blank" href={`${data.post.url}.txt`}>{data.post.url}.txt</a></small
    >
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
