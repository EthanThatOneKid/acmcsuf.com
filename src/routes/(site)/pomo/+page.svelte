<script lang="ts">
  import type { PageData } from './$types';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import type { Duration } from 'pomo';
  import { format } from 'pomo';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import Block from '$lib/components/block/block.svelte';

  export let data: PageData;

  let patternID = $page.url.searchParams.get('id') ?? '20-5-10';
  let timeFmt = $page.url.searchParams.get('fmt') ?? 'HH:mm:ss';
  let timeout: Duration = data.pomoOutput[patternID].timeout;
  let initialTimestamp: number;
  let currentTimestamp: number;
  let animationID: number;
  let elapsed: Duration = 0;

  $: patternID = $page.url.searchParams.get('id') ?? patternID;
  $: timeFmt = $page.url.searchParams.get('fmt') ?? timeFmt;
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
    updateCurrentTimestamp();
    if (timeout === 0) {
      // TODO: Look into invalidating the load function instead of calling location.reload().
      // See:
      // https://kit.svelte.dev/docs/load#rerunning-load-functions-manual-invalidation
      location.reload();
      return;
    }

    animationID = requestAnimationFrame(animate);
  }

  onMount(() => {
    updateReferenceTimestamp();
    animationID = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationID);
  });

  function updateReferenceTimestamp(): void {
    initialTimestamp = new Date().getTime();
  }

  function updateCurrentTimestamp(): void {
    currentTimestamp = new Date().getTime();
    elapsed = currentTimestamp - initialTimestamp;
    timeout =
      elapsed < data.pomoOutput[patternID].timeout
        ? data.pomoOutput[patternID].timeout - elapsed
        : 0;
    formattedTime = format(timeout, timeFmt);
  }
</script>

<svelte:head>
  <title>Pomo | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />
<div class="title-container">
  <Block>
    <h1 slot="headline" class="size-xl">🍅 Pomodomo Timer</h1>
  </Block>
  <p>📝 Select a pomo pattern and start studying! 📚</p>
</div>

<div class="timer-container">
  <section>
    <div class="button-container">
      <ul>
        {#each patterns as [id, href] (id)}
          <li>
            <a {href} class:active={id === patternID}> {id} </a>
          </li>
        {/each}
      </ul>
    </div>

    <time class="size-md timer">
      <div class="timer-container">
        <div class="timer-text">
          {formattedTime}
        </div>
        <p>Current pattern: {patternID}</p>
        <p>
          Right now: {#if data.pomoOutput[patternID].work}Work{:else}Break{/if}
        </p>
        <p>
          Next up: {#if data.pomoOutput[patternID].work}Break{:else}Work{/if}
        </p>
      </div>
    </time>
  </section>
</div>

<Spacing --min="40px" --med="95px" --max="120px" />

<div class="gif" />

<style lang="scss">
  :global(body) {
    overflow-x: hidden;
  }

  .button-container {
    width: 100%;
  }

  .button-container ul {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 2rem;
    gap: 3rem;
  }

  a {
    font-size: 1.5rem;
    padding: 1rem 2rem;
    cursor: pointer;
    border-radius: 50rem;
    background-color: var(--acm-bluer);
    text-decoration: none;
    display: block;
    text-align: center;
  }

  a:hover {
    background-color: var(--acm-redder);
  }

  .active {
    background-color: var(--acm-red);
  }

  p {
    text-align: center;
    margin: 1rem;
  }

  time .timer-container {
    text-align: center;
    background-color: var(--acm-sky);
    margin: 3rem 4rem;
    padding: 1rem;
    border-radius: 1rem;
  }

  time .timer-text {
    display: flex;
    justify-content: center;
    font-size: var(--size-xxl);
    font-family: monospace;
    padding: 3rem;
    border-radius: 1rem;
    background-color: var(--acm-blue);
  }

  .timer-container p {
    font-size: var(--size-lg);
    margin-top: 2rem;
  }

  .gif {
    width: 190px;
    height: 140px;
    background-image: url('/assets/pomo/character.gif');
    background-size: cover;
    animation-name: slide;
    animation-duration: 6s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: normal;
  }

  @keyframes slide {
    0% {
      transform: translateX(-40vw);
    }
    100% {
      transform: translateX(100vw);
    }
  }

  @media screen and (min-width: 740px) {
    time .timer-container {
      width: 50%;
      margin: auto;
    }
  }

  @media (prefers-reduced-motion) {
    .gif {
      display: none;
    }
  }
</style>
