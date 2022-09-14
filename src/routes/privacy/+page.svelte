<script lang="ts">
  // TODO: Replace Spacing [and CommonHero] with Block
  import Block from '$lib/components/block/block.svelte';
  import Spacing from '$lib/legacy/spacing.svelte';
  import PrivacyPolicy from './policy.svelte';
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<Block>
  <h2 slot="headline" class="size-lg">Privacy Policy</h2>
  <p slot="text" class="size-sm">
    Our privacy policy describes how our Discord bot collects, uses, and shares your personal data.
    <br />
    <br />
    Last updated January 16th, 2022
  </p>
</Block>

<Spacing --med="64px" />

<PrivacyPolicy />

<Spacing --min="40px" --med="95px" --max="120px" />
