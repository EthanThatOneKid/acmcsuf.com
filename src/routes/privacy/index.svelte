<script lang="ts">
  import CommonHero from '$lib/components/sections/common-hero.svelte';
  import Spacing from '$lib/components/sections/spacing.svelte';
  import PrivacyPolicy from '$lib/components/privacy/privacy-policy.svelte';
</script>

<svelte:head>
  <title>frankBot Privacy / ACM Chapter at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<CommonHero>
  <h2 slot="headline" class="size-lg">Privacy Policy</h2>
  <p slot="text" class="size-sm">
    Our privacy policy describes how our Discord bot collects, uses, and shares your personal data.
    <br />
    <br />
    Last updated January 16th, 2022
  </p>
</CommonHero>

<Spacing --med="64px" />

<PrivacyPolicy />

<Spacing --min="40px" --med="95px" --max="120px" />
