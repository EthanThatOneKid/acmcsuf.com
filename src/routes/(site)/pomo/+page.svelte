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
  let timeFmt = 'HH:mm:ss';
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
    <h1 slot="headline" class="size-xl"> 🍅 Pomodomo Timer </h1>
  </Block>
  <p> 📝 Use the appropriate timer slots to start studying! 📚 </p>
</div>

<div class="timer-container">
  <!-- <img src="/assets/png/acm-shark.png" alt="Frank" class="frank" /> -->
  <section>
    <button id="menu" style="display: none">Menu</button>
    <div class="button-container">
      <ul>
        {#each patterns as [id, href] (id)}
          <a {href}> {id} </a>
        {/each}
      </ul>
    </div>

    
    <time class="size-md timer">
      <div class = 'entire'>
        <div class = 'time'>
        {formattedTime}
    </div>
      <p class="work-period name"><i>Current Pattern : {patternID}</i></p>
    </div>
    </time>

    <!-- <pre> {JSON.stringify(data, null, 2)} </pre> -->

    
  </section>
</div>

<Spacing --min="40px" --med="95px" --max="120px" />
<div class = 'gif'></div>
<style lang="scss">

.button-container ul {
  display: flex; 
  justify-content: space-evenly;
}

.button-container ul a {
  font-size: 1.5rem;
  padding: 1rem 5rem;
  cursor: pointer;
  border-radius: 50rem;
  background-color: var(--acm-bluer);
  margin: 2rem 0rem;
}

.button-container ul a:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 0.3rem 0.2rem var(--acm-blue);
}

p {
  text-align: center;
}

time .entire {
  text-align: center;
  background-color: var(--acm-sky);
  margin: 3rem 4rem;
  padding: 4rem;
  border-radius: 0.2rem;
}

time .time {
  display: flex;
  justify-content: center;
  font-size: var(--size-xxl);
  padding: 5rem;
  background-color: var(--acm-blue);
}

.work-period {
  font-size: var(--size-xl);
  margin-top: 2rem;
}

.gif {
  width: 190px;
  height: 140px;
  background-image: url('./img/character.gif');
  background-size: cover; 
  animation-name: slide;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: normal;
}

@keyframes slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100rem);
  }
}
</style>
