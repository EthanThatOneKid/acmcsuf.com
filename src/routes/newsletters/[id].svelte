<script lang="ts" context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch, page }) {
    const id = page.params.id;
    return { props: { posts: [], id } };
  }
</script>

<script lang="ts">
  export let posts: any[];
  export let id: string;
</script>

<h1>Newsletter!</h1>

<p>{id}</p>
