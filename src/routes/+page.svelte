<script>
  import Spacing from '$lib/legacy/spacing.svelte';
  import Hero from './hero.svelte';
  import WhyJoin from './why-join.svelte';
  import AcmPaths from './acm-paths.svelte';
  import ReadyUp from './ready-up.svelte';
</script>

<svelte:head>
  <title>ACM at CSUF</title>
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
