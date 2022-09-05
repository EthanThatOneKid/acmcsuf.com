<script lang="ts">
  import type { QuizData } from '$lib/constants/quiz';

  export let data: QuizData;

  $: index = 0;
  let response: string[] = [];
  let noMoreQuestions: boolean = false;
  let showResults: boolean = false;
  let tallyChoices = {
    aiChoice: 0,
    algoChoice: 0,
    designChoice: 0,
    devChoice: 0,
  };
  let teams = ['aiChoice', 'algoChoice', 'designChoice', 'devChoice'];
  let match: string;

  function goLeft() {
    if (index > 0) {
      index--;
      noMoreQuestions = false;
    }
  }

  function goRight() {
    if (index < data.questions.length - 1) {
      index++;
    }
    if (index === data.questions.length - 1) {
      noMoreQuestions = true;
    }
  }

  function recordAnswer(choiceIndex: number) {
    response[index] = data.questions[index].choices[choiceIndex].match;

    goRight();
    console.log(response);
  }

  function submitResponses() {
    // tally up response choices once it is locked in and the user cant go back
    // below will condense the total number of clicks for its respective button
    // ex: {ai: 1, algo: 2, dev: 0, design: 0}
    response.forEach((choice) => {
      tallyChoices[choice] += (1 / data.questions.length) * 100;
    });

    // calculate best match
    let totalTallyValues = Object.values(tallyChoices);
    let totalTallyKey = Object.keys(tallyChoices);
    // first we find the biggest number => get index of that => find corresponding key to that index
    match = totalTallyKey[totalTallyValues.indexOf(Math.max(...totalTallyValues))];
    console.log(match);
    // save to localstorage
    // show results and hide the question
    showResults = true;
  }

  function restartQuiz() {
    response = [];
    index = 0;
    showResults = false;
    tallyChoices = {
      aiChoice: 0,
      algoChoice: 0,
      designChoice: 0,
      devChoice: 0,
    };
  }
</script>

<div class="container">
  {#if !showResults}
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
      {#if noMoreQuestions}
        <button on:click={submitResponses}>Submit</button>
      {:else}
        <button on:click={goRight}>👉</button>
      {/if}
    </div>
  {:else}
    <h1>Results!!!</h1>
    <div>
      <h3>{match}</h3>
      <p>{tallyChoices[match].toFixed(0)}% match!</p>
    </div>
    {#each teams as otherMatches (otherMatches)}
      {#if otherMatches !== match}
        <div>
          <h3>{otherMatches}</h3>
          <p>{tallyChoices[otherMatches].toFixed(0)}% match!</p>
        </div>
      {/if}
    {/each}
    <button on:click={restartQuiz}>Take Quiz Again</button>
  {/if}
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
