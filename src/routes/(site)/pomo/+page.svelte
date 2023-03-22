<script lang="ts">
  import type { PageData } from './$types';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import type { Duration } from 'pomo';
  import { format } from 'pomo';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import Block from '$lib/components/block/block.svelte';

  export let data: PageData;

  let patternID = '20-5-10';
  let timeFmt = 'HH:mm:ss.SSS';
  let timestamp: number;
  let referenceTimestamp: number;
  let animationID: number;
  let timeout: Duration;
  let elapsed: Duration = 0;

  $: patternID = $page.url.searchParams.get('id') || patternID;
  $: timeFmt = $page.url.searchParams.get('fmt') || timeFmt;
  $: formattedTime = format(timeout, timeFmt);
  $: patterns = Object.keys(data.pomoOutput).map((id) => {
    if (id === patternID) {
      return [id, '#'];
    }
    const destination = new URL($page.url);
    destination.searchParams.set('id', id);
    return [id, destination.toString()];
  });

  function animate() {
    timestamp = getClientTimestamp();
    elapsed = timestamp - referenceTimestamp;
    timeout =
      elapsed < data.pomoOutput[patternID].timeout
        ? data.pomoOutput[patternID].timeout - elapsed
        : 0;
    formattedTime = format(timeout, timeFmt);
    if (timeout === 0) {
      cancelAnimationFrame(animationID);
      return;
    }

    animationID = requestAnimationFrame(animate);
  }

  onMount(() => {
    referenceTimestamp = getClientTimestamp();
    animationID = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationID);
  });

  function getClientTimestamp(): number {
    return new Date().getTime();
  }
</script>

<svelte:head>
  <title>Pomo | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />
<div class="title-container">
  <Block>
    <h1 slot="headline" class="size-xl">Pomodomo Timer</h1>
    <h3 slot="text" class="size-xl text">
      Official at CSUF ACM <img src="/assets/png/acm-csuf-badge.png" alt="ACM Logo" class="acm" />
    </h3>
  </Block>
</div>

<div class="timer-container">
  <!-- <img src="/assets/png/acm-shark.png" alt="Frank" class="frank" /> -->
  <section>
    <button id="menu" style="display: none">Menu</button>
    <div class="button-container">
      <ul>
        {#each patterns as [id, href] (id)}
          <li><a {href}> {id} </a></li>
        {/each}
      </ul>
    </div>

    <time class="size-md timer">{formattedTime}</time>

    <!-- <pre> {JSON.stringify(data, null, 2)} </pre> -->

    <h2 class="work-period name">Starting TypeScript work pattern...</h2>
  </section>
</div>

<Spacing --min="100px" --med="175px" --max="200px" />

<Spacing --med="64px" />

<Spacing --min="40px" --med="95px" --max="120px" />

<style lang="scss">
</style>
