<script lang="ts">
  import type { QuizData, TeamMatch } from '$lib/quiz';
  import LeftArrow from '$lib/components/icons/left-arrow.svelte';
  import RightArrow from '$lib/components/icons/right-arrow.svelte';
  import MoreInfo from './more-info.svelte';

  export let data: QuizData;

  $: index = 0;
  let response: TeamMatch[] = [];
  $: answeredAllQuestions =
    response.length === data.questions.length && !response.includes(undefined);
  let showResults = false;
  let showMoreInfo = false;
  let showTeam: string;
  $: talliedResponses = response.reduce((tallies, match) => {
    if (tallies[match]) tallies[match]++;
    else tallies[match] = 1;
    return tallies;
  }, {});
  let teams = ['Algo', 'Dev', 'Design', 'AI'];
  let match: string;

  function goLeft() {
    if (index > 0) {
      index--;
    }
  }

  function goRight() {
    if (index < data.questions.length - 1) {
      index++;
    }
    if (index === data.questions.length) {
      // need to display text at the bottom that says:
      console.log('please answer all questions');
    }
  }

  function recordAnswer(match: TeamMatch) {
    console.log(match);

    response[index] = match;
    // if answered all questions and no more questions then submitResponses
    if (!answeredAllQuestions) {
      goRight();
    }
  }

  function submitResponses() {
    let totalTallyKey: string[] = Object.keys(talliedResponses);
    let totalTallyValue: number[] = Object.values(talliedResponses);
    match = totalTallyKey[totalTallyValue.indexOf(Math.max(...totalTallyValue))];
    console.log(match);
    // save to localstorage
    // show results and hide the question
    showResults = true;
  }

  function restartQuiz() {
    response = [];
    index = 0;
    showResults = false;
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
        {#each data.questions[index].choices as choice (choice.content)}
          <button on:click={() => recordAnswer(choice.match)} style={`--color: ${choice.color}`}>
            <h3>{choice.content}</h3>
          </button>
        {/each}
      </section>
    </div>
    <div class="arrow-wrapper">
      <!-- this scary tenary thing for the classes just determines when to show and not -->
      <button on:click={goLeft} class={`${index === 0 && 'disable-arrow'} arrow`}
        ><LeftArrow /></button
      >
      <button
        on:click={goRight}
        class={`${index === data.questions.length - 1 && 'disable-arrow'} arrow`}
        ><RightArrow /></button
      >
    </div>
    <button
      on:click={submitResponses}
      class={`${!answeredAllQuestions && 'disable-submitBTN'} submitBTN`}>Submit</button
    >

    <!-- DISPLAY ADDIONTAL TEAM INFORMATION -->
  {:else if showMoreInfo}
    <MoreInfo teamPage={showTeam} />
    <button on:click={goBackToResults}>Go Back</button>
    <!-- DISPLAY THE RESULTS -->
  {:else}
    <h1>Results!!!</h1>
    <p>You Matched</p>
    <h2>{match}</h2>
    <p>Click the teams below to see your next step</p>
    <div class="result-grid">
      <div on:click={() => showTeamDetails(match)} class="result-grid-box">
        <h3>{match}</h3>
        <p>{talliedResponses[match]}% match!</p>
      </div>
      {#each teams as otherMatches (otherMatches)}
        {#if otherMatches !== match}
          <div on:click={() => showTeamDetails(otherMatches)} class="result-grid-box">
            <h3>{otherMatches}</h3>
            <p>
              {talliedResponses[otherMatches] ? talliedResponses[otherMatches] : 0}% match!
            </p>
          </div>
        {/if}
      {/each}
    </div>
    <button on:click={restartQuiz} class="action-btn">Take Quiz Again</button>
    <button on:click={() => showTeamDetails('help')} class="action-btn">Want to help out?</button>
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

  // Quiz Styles

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
  .submitBTN,
  .action-btn {
    margin-top: 15px;
    font-size: 24px;
    font-weight: 500;
    padding: 8px 28px;
    min-height: 42px;
    background-color: var(--acm-gray);
    border-radius: 8px;
    border: var(--acm-blue) 3px solid;
    cursor: pointer;
    transition: box-shadow 0.25s ease-in-out;
  }
  .submitBTN:hover,
  .action-btn:hover {
    box-shadow: 0px 0px 10px var(--acm-blue);
  }

  .disable-submitBTN,
  .disable-arrow {
    opacity: 0.5;
    pointer-events: none;
    border: none;
  }

  // Result Styles

  .result-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
  }

  .result-grid-box {
    padding: 8px 28px;
    min-height: 42px;
    background-color: var(--acm-gray);
    border-radius: 8px;
    border: var(--color) 3px solid;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
</style>
