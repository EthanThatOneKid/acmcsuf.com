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
  let info= pattern.at(timestamp, todayStart);

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

    return () => clearInterval(timer)
  });
</script>

<svelte:head>
  <title>Pomo | ACM at CSUF</title>
</svelte:head>



<Spacing --min="175px" --med="200px" --max="200px" />
 
<Block>

  <h1 slot="headline" class="size-xl">🍅 Pomodomo Timer</h1>
 
</Block> 
 
<section>
  <div class = 'button-container'>
    <button id = 'btn'>Work 1</button>
    <button id = 'btn'>Work 2</button>
    <button id = 'btn'>Work 3</button>
    <button id = 'btn'>Work 4</button>
    <button id = 'btn'>Work 5</button>
  </div>

  <p class="size-md">
    {durationFmt(info.remainingMs)}
  </p>

<div class = 'toggle-container'>
  <button class = 'toggle-btns start'> Start </button>
  <button class = 'toggle-btns stop'> Stop </button>
</div>
  

</section>


<Spacing --min="100px" --med="175px" --max="200px" />



<Spacing --med="64px" />



<Spacing --min="40px" --med="95px" --max="120px" />


<style lang="scss">

  .size-md {
    margin: 40px 0px 40px 0px;
  }
  .size-xl {
    font-size: 60px;
    margin-bottom: 50px;
    color: var(--acm-white);
  }

  section {
    padding: 60px 10px 60px 10px;
    background-color: var(--acm-blue);
    box-shadow: 0 0 30px var( --acm-sky);
   
    margin-left: auto;
    margin-right: auto;
    max-width: 750px;
    border-radius: 15px;
  }

  button {
    background: none;
    border: none;
    font-weight: 600;
    cursor: pointer;
    font-size: 25px;
  }

  button:hover {
    border-bottom: solid 1px var(--acm-blue);
    transform: scale(1.1);
    box-shadow: 0 0 15px var(--acm-gray);
    border-radius: 50px;
  }

  section .size-md {
    font-size: 65px;
    font-weight: 900;
    text-align: center;
  }

  .button-container {
    padding: 20px 1px 50px 1px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    color:rgba(215, 213, 224, 0.95);
  }

  .button-container button {
    padding: 13px;
    margin-top: 20px;
    border-bottom: solid 2px var(--acm-dark);
    
  }

  .toggle-container {
    text-align: center;
    display: flex;
    justify-content: space-evenly;
  }

  .toggle-container button {
    background: none;
    color: var(--acm-dark);
    padding: 20px;
    width: 200px;
    border-radius: 10px;
    border: solid 1px rgba(213, 202, 202, 0.593);
    font-size: 40px;
    box-shadow: 0 0 8px var(--acm-gray);

  }

  .toggle-container .start {
    background-color: var(--acm-emerald);
  }

  .toggle-container .stop {
    background-color: rgb(169, 43, 43);
  }
</style>
