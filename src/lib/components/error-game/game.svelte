<script lang="ts">
  import { onMount } from 'svelte';
  import { setup } from './game';

  let canvas: HTMLCanvasElement | undefined;
  let mobileButton: HTMLButtonElement | undefined;

  onMount(() => {
    if (!canvas || !mobileButton) {
      throw new Error('Canvas or mobileButton not found');
    }

    setup(canvas, mobileButton);
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Luckiest+Guy&family=Pixelify+Sans:wght@500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<canvas id="game-canvas" bind:this={canvas} />
<button id="mobileButton" bind:this={mobileButton}>Start</button>

<style>
  #game-canvas {
    border: 5px solid black;
    position: absolute;
    /* Center the canvas in the center of the page */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* Setting max width and height so that we can always
    see the entire canvas regardless of width or height */

    max-width: 100%;
    max-height: 100%;
  }

  #mobileButton {
    display: none;
  }

  @media (max-width: 748px) {
    #mobileButton {
      display: block;
      width: 100px;
      height: 80px;
      position: absolute;
      padding: 10px;
      transform: translateX(-50%);
      bottom: 100px;
      left: 50%;
      background-color: bisque;
    }
  }
</style>
