<script lang="ts">
  import Block from '$lib/components/block/block.svelte';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import PrivacyPolicy from './policy.svelte';
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<Block>
  <h1 slot="headline" class="size-lg">Privacy Policy for ACM at CSUF</h1>
  <p slot="text" class="size-sm">Last updated September 19th, 2023</p>
</Block>

<Spacing --med="64px" />

<PrivacyPolicy />

<Spacing --min="40px" --med="95px" --max="120px" />
