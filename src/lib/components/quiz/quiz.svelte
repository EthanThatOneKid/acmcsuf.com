<script lang="ts">
  import type { QuizData } from '$lib/constants/quiz';
  import LeftArrow from '../icons/leftArrow.svelte';
  import RightArrow from '../icons/rightArrow.svelte';
  import MoreInfo from './moreInfo.svelte';

  export let data: QuizData;

  $: index = 0;
  let response: string[] = [];
  let noMoreQuestions: boolean = false;
  let answeredEveryQuestion: boolean = false;
  let showResults: boolean = false;
  let showMoreInfo: boolean = false;
  let showTeam: string;
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

      console.log('please answer all questions');
    }
  }

  function recordAnswer(choiceIndex: number) {
    response[index] = data.questions[index].choices[choiceIndex].match;
    // if answered all questions and no more questions then submitResponses
    if (!response.includes(undefined) && response.length === data.questions.length) {
      answeredEveryQuestion = true;
    } else {
      goRight();
    }
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
    // save to localstorage
    // show results and hide the question
    showResults = true;
  }

  function restartQuiz() {
    response = [];
    index = 0;
    showResults = false;
    noMoreQuestions = false;
    answeredEveryQuestion = false;
    tallyChoices = {
      aiChoice: 0,
      algoChoice: 0,
      designChoice: 0,
      devChoice: 0,
    };
  }

  function showTeamDetails(currentTeam: string) {
    showMoreInfo = true;
    showTeam = currentTeam;
  }
  function goBackToResults() {
    showMoreInfo = false;
  }
</script>

<div class="container">
  <!-- DISPLAY THE QUIZ QUESTIONS -->
  {#if !showResults}
    <h1>ACM PATH QUIZ</h1>
    <div class="question">
      <h2>{data.questions[index].prompt}</h2>
      {#if response[index]}
        <p>answered</p>
      {/if}
      <section class="answers">
        {#each data.questions[index].choices as choice, j (choice.content)}
          <button on:click={() => recordAnswer(j)} style={`--color: ${choice.color}`}>
            <h3>{choice.content}</h3>
          </button>
        {/each}
      </section>
    </div>
    <div class="arrow-wrapper">
      <!-- this scary tenary thing for the classes just determines when to show and not -->
      <button on:click={goLeft} class={`${!(index === 0) ? 'arrow ' : 'hidden'}`}
        ><LeftArrow /></button
      >
      <button
        on:click={goRight}
        class={`${!(index === data.questions.length - 1) ? 'arrow ' : 'hidden'}`}
        ><RightArrow /></button
      >
    </div>
    {#if answeredEveryQuestion}
      <button on:click={submitResponses} class="submitBTN">Submit</button>
    {/if}
    <!-- DISPLAY ADDIONTAL TEAM INFORMATION -->
  {:else if showMoreInfo}
    <MoreInfo teamPage={showTeam} />
    <button on:click={goBackToResults}>Go Back</button>
    <!-- DISPLAY THE RESULTS -->
  {:else}
    <h1>Results!!!</h1>
    <div>
      <h3 on:click={() => showTeamDetails(match)}>{match}</h3>
      <p>{tallyChoices[match].toFixed(0)}% match!</p>
    </div>
    {#each teams as otherMatches (otherMatches)}
      {#if otherMatches !== match}
        <div>
          <h3 on:click={() => showTeamDetails(otherMatches)}>{otherMatches}</h3>
          <p>{tallyChoices[otherMatches].toFixed(0)}% match!</p>
        </div>
      {/if}
    {/each}
    <button on:click={restartQuiz}>Take Quiz Again</button>
    <button on:click={() => showTeamDetails('help')}>Want to help out?</button>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  .question {
    width: 600px;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  .question h2 {
    text-align: center;
  }

  .answers {
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 350px;
    height: 400px;
  }

  .answers button {
    padding: 8px 28px;
    min-height: 42px;
    background-color: var(--acm-gray);
    border-radius: 8px;
    border: var(--color) 3px solid;
    cursor: pointer;
    transition: 0.25s ease-in-out;
  }

  .answers button:hover {
    box-shadow: 0px 0px 10px var(--color);
  }

  .arrow-wrapper {
    display: flex;
    gap: 30px;
  }

  .arrow {
    background: none;
    border: var(--acm-dark) 3px solid;
    border-radius: 18px;
    padding: 8px;
    transition: 0.25s ease-in-out;
  }

  .arrow:hover {
    box-shadow: 0px 0px 4px var(--acm-dark);
  }

  .submitBTN {
    margin-top: 15px;
    font-size: 24px;
    font-weight: 500;
    padding: 8px 28px;
    min-height: 42px;
    background-color: var(--acm-gray);
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: box-shadow 0.25s ease-in-out;
  }
  .submitBTN:hover {
    box-shadow: 0px 0px 10px var(--acm-blue);
  }

  .hidden {
    opacity: 0;
    background: none;
    border: var(--acm-dark) 3px solid;
    border-radius: 18px;
    padding: 8px;
  }
</style>
