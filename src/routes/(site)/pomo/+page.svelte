<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  import { PomoPattern } from '$lib/public/pomo';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import Block from '$lib/components/block/block.svelte';

  import { durationFmt } from './duration-fmt';
  import { PATTERNS } from './patterns';

  // TODO (remove this comment when done):
  // - [ ] Add a timer
  // - [ ] Add selection for valid patterns
  // - [ ] Expand selection to valid custom patterns

  const defaultPattern = PATTERNS[0];
  const todayStart = new Date(new Date().setHours(0, 0, 0, 0));

  let pattern = PomoPattern.fromString($page.params.pattern || defaultPattern);
  let timestamp = new Date();
  let timer: number;
  let info = pattern.at(timestamp, todayStart);

  $: {
    if (browser) {
      pattern = PomoPattern.fromString($page.params.pattern || defaultPattern);
      info = pattern.at(timestamp, todayStart);

      // TODO: Remove this debug statement.
      console.log({ hello: { ...info } });
    }
  }

  onMount(() => {
    timer = setInterval(() => {
      timestamp = new Date();
    }, 1e3) as unknown as number;

    return () => clearInterval(timer);
  });
</script>

<svelte:head>
  <title>Pomo | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<Block>
  <h1 slot="headline" class="size-xl">Pomo 🍅</h1>
  <p slot="text" class="size-md">
    {durationFmt(info.remainingMs)}
  </p>
</Block>

<Spacing --min="100px" --med="175px" --max="200px" />

stuff

<Spacing --med="64px" />

stuff

<Spacing --min="40px" --med="95px" --max="120px" />
