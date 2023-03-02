<script lang="ts">
  import type { PageData } from './$types';
  import GenuaryPage from '../genuary-page.svelte';

  export let data: PageData;
</script>

<GenuaryPage data={data.pieces} year="Placekitten" />
