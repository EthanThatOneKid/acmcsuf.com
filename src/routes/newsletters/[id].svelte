<script lang="ts" context="module">
  import { newslettersQuery } from './_query';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch, page }) {
    const { id: slug } = page.params;
    const ghAccessToken = import.meta.env.VITE_GH_ACCESS_TOKEN;
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `token ${ghAccessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: newslettersQuery }),
    });
    const json = await response.json();
    console.log({ json });
    return { props: { posts: [], slug } };
  }
</script>

<script lang="ts">
  export let posts: any[];
  export let slug: string;
</script>

<h1>Newsletter!</h1>

<p>{slug}</p>
