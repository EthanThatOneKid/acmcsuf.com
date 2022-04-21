<script>
  import Hero from '$lib/components/index/hero.svelte';
  import WhyJoin from '$lib/components/index/why-join.svelte';
  import AcmPaths from '$lib/components/index/acm-paths.svelte';
  import Spacing from '$lib/components/sections/spacing.svelte';
  import ReadyUp from '$lib/components/index/ready-up.svelte';
</script>

<svelte:head>
  <title>ACM Chapter at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<Hero />

<Spacing --min="120px" --med="175px" --max="200px" />

<WhyJoin />

<Spacing --min="120px" --med="175px" --max="200px" />

<AcmPaths />

<Spacing --min="120px" --med="175px" --max="200px" />

<ReadyUp />

<Spacing --min="75px" --med="100px" --max="120px" />
