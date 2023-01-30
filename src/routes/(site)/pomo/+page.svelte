<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  import { Pomo, format, PomoStamp } from 'pomo';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import Block from '$lib/components/block/block.svelte';

  import { PATTERNS } from './patterns';

  // TODO (remove this comment when done):
  // - [ ] Add a timer
  // - [ ] Add selection for valid patterns
  // - [ ] Expand selection to valid custom patterns

  const defaultPattern = PATTERNS[0];
  const todayStart = new Date(new Date().setHours(0, 0, 0, 0));

  let pattern: Pomo;
  let timestamp = new Date();
  let timer: number;
  let info: PomoStamp | undefined;

  $: {
    if (browser) {
      pattern = Pomo.fromPattern({
        pattern: $page.params.pattern || defaultPattern,
        dayLength: 1 * 24 * 60 * 60 * 1e3, // 1 day in milliseconds
        ref: todayStart.valueOf(), // Previous midnight
        scale: 1 * 60 * 1e3, // Scale minutes in pattern to milliseconds
      });
      info = pattern.at(timestamp.valueOf());
    }
  }

  onMount(() => {
    timer = setInterval(() => {
      timestamp = new Date();
    }, 1e3) as unknown as number;

    return () => clearInterval(timer);
  });

  /* For the Menu Part to see the Work on A smaller phone Screen 

 let menu = document.getElementById('menu');
  let btns = document.querySelectorAll('.btn');
  if (menu) {
    menu.addEventListener('click', () => {
      btns.forEach((btn) => {
        btn.classList.toggle('show');
      });
    });
  }

  */
</script>

<svelte:head>
  <title>Pomo | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />
<<<<<<< Updated upstream
<div class="title-container">
  <Block>
    <h1 slot="headline" class="size-xl">Pomodomo Timer</h1>
    <h3 slot="text" class="size-xl text">
      Official at CSUF ACM <img src="/assets/png/acm-csuf-badge.png" alt="ACM Logo" class="acm" />
    </h3>
  </Block>
</div>

<div class="timer-container">
  <img src="/assets/png/acm-shark.png" alt="Frank" class="frank" />
  <section>
    <button id="menu" style="display: none">Menu</button>
    <div class="button-container">
      <ul>
        <li><button id="btn" class="b">Work</button></li>
        <li><button id="btn" class="b">Work</button></li>
        <li><button id="btn" class="b">Work</button></li>
        <li><button id="btn" class="b">Work</button></li>
        <li><button id="btn" class="b">Work</button></li>
      </ul>
    </div>

    <p class="size-md timer">
      {durationFmt(info.remainingMs)}
    </p>

    <h2 class="work-period name">Starting TypeScript work pattern...</h2>
    <div class="toggle-container">
      <button class="toggle-btns start"> Start </button>
      <button class="toggle-btns stop"> Stop </button>
    </div>
  </section>
</div>
=======

<Block>
  <h1 slot="headline" class="size-xl">🍅 Pomodomo Timer</h1>
</Block>

<section>
  <div class="button-container">
    <button id="btn">Work 1</button>
    <button id="btn">Work 2</button>
    <button id="btn">Work 3</button>
    <button id="btn">Work 4</button>
    <button id="btn">Work 5</button>
  </div>

  <p class="size-md">
      {format(info?.timeout ?? 0, 'HH:mm:ss.SSS')}
  </p>

  <div class="toggle-container">
    <button class="toggle-btns start"> Start </button>
    <button class="toggle-btns stop"> Stop </button>
  </div>
</section>
>>>>>>> Stashed changes

<Spacing --min="100px" --med="175px" --max="200px" />

<Spacing --med="64px" />

<Spacing --min="40px" --med="95px" --max="120px" />

<style lang="scss">
  * {
    margin: 10px;
  }

  button {
    cursor: pointer;
  }

  button:hover {
    transform: scale(1.05);
  }
  .acm {
    max-width: 50px;
    margin-left: 5px;
  }

  .frank {
    max-width: 500px;
    position: absolute;
    left: 13%;
    top: 43%;
    z-index: -1;
  }

  .title-container {
    margin-bottom: 170px;
  }

  .size-xl {
    font-size: 90px;
    margin-bottom: 5px;
    color: var(--acm-white);
  }

  @media screen and (max-width: 1000px) {
    .size-xl {
      font-size: 65px;
    }

    #btn {
      display: none;
    }

    .timer {
      font-size: 25px;
    }

    .frank {
      top: 58%;
      left: 10%;
      max-width: 400px;
    }
  }

  section {
    padding: 30px 90px 90px 90px;
    background-color: var(--acm-sky);
    box-shadow: 0 0 12px var(--acm-sky);
    margin-left: auto;
    margin-right: auto;
    max-width: 850px;
    border-radius: 15px;
  }

  .work-period {
    text-align: center;
    margin: 40px;
  }

  #btn {
    background: none;
    border: none;
    font-weight: 600;
    font-size: 30px;
    padding: 15px;
    border-bottom: solid 1px var(--acm-light);
  }

  #btn:hover {
    background-color: var(--acm-bluer);
  }

  section .size-md {
    font-size: 95px;
    text-align: center;
    font-weight: 900;
    margin: 40px 0px 40px 0px;
  }

  .timer {
    background-color: var(--acm-blue);
    padding: 50px;
    border-radius: 15px;
    box-shadow: 0 0 5px rgb(52, 105, 165); /* Can we add this as a color? */
  }

  .text {
    font-size: 40px;
  }

  .button-container {
    padding: 20px 1px 20px 1px;
    display: flex;
    justify-content: space-evenly;
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
    width: 300px;
    font-size: 40px;
    border: solid px var(--acm-gray);
    box-shadow: 0 0 8px var(--acm-gray);
  }

  .toggle-container .start {
    background-color: var(--acm-emerald);
  }

  .toggle-container .stop {
    background-color: rgb(169, 43, 43);
  }
</style>
