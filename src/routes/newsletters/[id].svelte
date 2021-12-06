<script lang="ts" context="module">
  import type { LoadOutput, LoadInput } from '@sveltejs/kit';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch, page }: LoadInput): Promise<LoadOutput> {
    const { id: slug } = page.params;
    const response = await fetch(`/newsletters/${slug}.json`);
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

  export let post: Newsletter;
</script>

<svelte:head>
  <title>{post.title}</title>
  <link rel="stylesheet" href="global.css" />
</svelte:head>

<Spacing --min="120px" --med="135px" --max="160px" />

<section>
  <h1>{post.title}</h1>

  <Spacing --min="70px" --med="70px" --max="70px" />

  <p>
    by
    <a href={'https://github.com/' + post.author.displayname} target="_blank">
      @{post.author.displayname}
    </a>
  </p>

  <Spacing --min="70px" --med="70px" --max="70px" />

  <div class="container">
    <div class="markdown-body">
      {@html post.html}
    </div>
  </div>

  <Spacing />
</section>

<style lang="scss">
  @import '../node_modules/gfm.css/source/gfm.scss';

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: var(--max-h-font-size);
    text-decoration: wavy underline;
    text-underline-offset: 0.5em;
  }

  .container {
    padding: 2em;
    margin: 0;
    border-radius: 2em;
    border: 2px solid var(--acm-sky);
    width: min(1000px, 77vw);
  }

  @media (max-width: 1440px) {
    h1 {
      font-size: var(--h-font-size-med);
    }
  }

  @media (max-width: 340px) {
    h1 {
      font-size: var(--min-h-font-size);
    }
  }
</style>
