<script lang="ts">
  import BlogPostPreview from './blog-post-preview.svelte';
  import BLOG_POST from '../data.json';
  import Spacing from '$lib/public/legacy/spacing.svelte';
</script>

<Spacing --min="175px" --med="200px" --max="200px" />
<BlogPostPreview data={BLOG_POST[0]} />
