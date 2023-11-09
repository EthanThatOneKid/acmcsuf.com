<script lang="ts">
  import type { BlogPost } from '$lib/public/blog/types';
  export let data: BlogPost;
</script>

{data.title}
