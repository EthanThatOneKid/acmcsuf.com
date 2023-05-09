<script lang="ts">
  import type { PageData } from './$types';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import type { Duration } from 'pomo';
  import { format } from 'pomo';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import Block from '$lib/components/block/block.svelte';
  import { invalidateAll } from '$app/navigation';

  export let data: PageData;
  $: pomoOutput = data.pomoOutput;

  let patternID = '20-5-10';
  let timeFmt = 'HH:mm:ss';
  let timestamp: number;
  let referenceTimestamp: number;
  let animationID: number;
  let timeout: Duration;
  let elapsed: Duration = 0;

  $: patternID = $page.url.searchParams.get('id') || patternID;
  $: timeFmt = $page.url.searchParams.get('fmt') || timeFmt;
  $: formattedTime = format(timeout, timeFmt);
  $: patterns = Object.keys(pomoOutput).map((id) => {
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
    timeout = elapsed < pomoOutput[patternID].timeout ? pomoOutput[patternID].timeout - elapsed : 0;
    formattedTime = format(timeout, timeFmt);
    if (timeout === 0) {
      cancelAnimationFrame(animationID);
      invalidateAll().then(console.log).catch(console.log);
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
    <h1 slot="headline" class="size-xl">🍅 Pomodomo Timer</h1>
  </Block>
  <p>📝 Use the appropriate timer slots to start studying! 📚</p>
</div>

<div class="timer-container">
  <section>
    <button id="menu" style="display: none">Menu</button>
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
      <div class="entire">
        <div class="time">
          {formattedTime}
        </div>
        <p class="work-period name"><i>Current pattern: {patternID}</i></p>
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

  time .entire {
    text-align: center;
    background-color: var(--acm-sky);
    margin: 3rem 4rem;
    padding: 1rem;
    border-radius: 1rem;
  }

  time .time {
    display: flex;
    justify-content: center;
    font-size: var(--size-xxl);
    padding: 3rem;
    border-radius: 1rem;
    background-color: var(--acm-blue);
  }

  .work-period {
    font-size: var(--size-xl);
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
    time .entire {
      width: 50%;
      margin: auto;
    }
  }
</style>
