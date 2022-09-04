<script lang="ts">
  import type { QuizData } from '$lib/constants/quiz';

  export let data: QuizData;

  $: index = 0;
  let response: number[] = [];

  function goLeft() {
    if (index > 0) {
      index--;
    }
  }

  function goRight() {
    if (index < data.questions.length - 1) {
      index++;
    }
  }

  function recordAnswer(choiceIndex: number) {
    response[index] = choiceIndex;
    goRight();
  }
</script>

<div class="container">
  <h1>QUIZ</h1>
  <div class="question">
    <h2>{data.questions[index].prompt}</h2>
    <ul>
      {#each data.questions[index].choices as choice, j (choice.content)}
        <li on:click={() => recordAnswer(j)} style={`--color: ${choice.color}`}>
          <h3>{choice.content}</h3>
        </li>
      {/each}
    </ul>
  </div>
  <div>
    <button on:click={goLeft}>👈</button>
    <button on:click={goRight}>👉</button>
  </div>
</div>

<style lang="scss">
  ul li {
    background-color: var(--color);
    width: 800px;
  }

  .container {
    display: grid;
    justify-content: center;
    align-items: center;
  }
</style>
