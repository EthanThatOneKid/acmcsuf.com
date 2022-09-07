<script lang="ts">
  import { QuizData, QuizStorage, TeamMatch } from '$lib/quiz';
  import { AcmPath, acmAlgo, acmDev, acmDesign, acmAI, acmGeneral } from '$lib/constants/acm-paths';
  import { onMount } from 'svelte';
  import ProgressBar from '$lib/components/quiz/progress-bar.svelte';
  import LeftArrow from '$lib/components/icons/left-arrow.svelte';
  import RightArrow from '$lib/components/icons/right-arrow.svelte';
  import MoreInfo from './more-info.svelte';
  import AcmPaths from '../index/acm-paths.svelte';

  export let data: QuizData;

  const TEAMS = {
    [TeamMatch.AI]: acmAI,
    [TeamMatch.DEV]: acmDev,
    [TeamMatch.DESIGN]: acmDesign,
    [TeamMatch.ALGO]: acmAlgo,
  };
  const TEAMLESS = { [TeamMatch.TEAMLESS]: acmGeneral };
  //  [acmAlgo.title, acmDev.title, acmDesign.title, acmAI.title]
  let index = 0;
  let responses: TeamMatch[] = [];
  let answeredAllQuestions = false;
  // local storage stuff
  let quizStorage: QuizStorage | undefined;
  $: {
    answeredAllQuestions =
      responses.length === data.questions.length && !responses.includes(undefined);
    // Updates local storage whenever `responses` changes.
    quizStorage && quizStorage.setResponses(responses);
  }
  let showResults = false;
  let showMoreInfo = false;
  let showTeam: AcmPath;
  $: talliedResponses = responses.reduce((tallies, match) => {
    if (tallies[match]) tallies[match]++;
    else tallies[match] = 1;
    return tallies;
  }, {} as Record<TeamMatch, number>);
  $: match = (Object.entries(talliedResponses)
    .sort(([, a], [, b]) => b - a)
    ?.shift()
    ?.shift() ?? TeamMatch.TEAMLESS) as TeamMatch;

  function goLeft() {
    if (index > 0) index--;
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
    responses[index] = match;
    goRight();
  }

  function submitResponses() {
    // show results and hide the question
    showResults = true;
  }

  function restartQuiz() {
    responses = [];
    index = 0;
    showResults = false;
    quizStorage.clearResponses();
  }

  function showTeamDetails(currentTeam: AcmPath) {
    showMoreInfo = true;
    showTeam = currentTeam;
  }

  function goBackToResults() {
    showMoreInfo = false;
  }

  onMount(() => {
    // hypothetically change this to QuizStorage.init()
    quizStorage = new QuizStorage();
  });
</script>

<div class="container">
  <!-- DISPLAY THE QUIZ QUESTIONS -->
  {#if !showResults}
    <h1>ACM TEAM QUIZ</h1>
    <div class="question">
      <h2>{data.questions[index].prompt}</h2>
      {#if responses[index]}
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
      <button
        on:click={goLeft}
        disabled={index === 0}
        class={`${index === 0 && 'disable-arrow'} arrow`}><LeftArrow /></button
      >
      <button
        on:click={goRight}
        disabled={index === data.questions.length - 1}
        class={`${index === data.questions.length - 1 && 'disable-arrow'} arrow`}
        ><RightArrow /></button
      >
    </div>
    <button
      on:click={submitResponses}
      disabled={!answeredAllQuestions}
      class={`${!answeredAllQuestions && 'disable-submitBTN'} submitBTN`}>Submit</button
    >

    <!-- DISPLAY ADDIONTAL TEAM INFORMATION -->
  {:else if showMoreInfo}
    <MoreInfo teamMatch={showTeam} />
    <button
      on:click={goBackToResults}
      disabled={index === 0}
      class={`${index === 0 && 'disable-arrow'} arrow return-to-results`}
      ><LeftArrow />
      <h3>Check out other teams</h3></button
    >
    <!-- DISPLAY THE RESULTS -->
  {:else}
    <h1>Results</h1>
    <p>You Matched</p>
    <h2 class="match-title" style={`--team-color: ${TEAMS[match].color}`}>
      {match} <span>Team</span>
    </h2>
    <p>Click the teams below to see your next step</p>
    <div class="result-grid">
      <div
        class="result-grid-box"
        on:click={() => showTeamDetails(TEAMS[match])}
        style={`--border-color: ${TEAMS[match].color}`}
      >
        <h2 class="team-title" style={`--team-color: ${TEAMS[match].color}`}>
          {match} <span>Team</span>
        </h2>
        <img src={TEAMS[match].picture} alt={`${match} icon`} class="team-icon" />
        <ProgressBar
          progress={(talliedResponses[match] / data.questions.length) * 100}
          fillColor={TEAMS[match].color}
        />
      </div>
      {#each Object.entries(TEAMS).filter(([otherMatch]) => otherMatch !== match) as [otherMatch, team] (otherMatch)}
        <div
          class="result-grid-box"
          style={`--border-color: ${team.color}`}
          on:click={() => showTeamDetails(team)}
        >
          <h2 class="team-title" style={`--team-color: ${team.color}`}>
            {otherMatch} <span>Team</span>
          </h2>
          <img src={team.picture} alt={`${otherMatch} icon`} class="team-icon" />

          <ProgressBar
            progress={talliedResponses[otherMatch]
              ? (talliedResponses[otherMatch] / data.questions.length) * 100
              : 0}
            fillColor={team.color}
          />
        </div>
      {/each}
    </div>
    <button on:click={restartQuiz} class="action-btn">Take Quiz Again</button>
    <!-- PUT INSIDE THE DIV ONCE YOU FIX IT on:click={() => showTeamDetails(help)} MORE-INFO.SVELTE-->
    <button class="action-btn" on:click={() => showTeamDetails(TEAMLESS['N/A'])}
      >Want to help out?</button
    >
  {/if}
</div>

<style lang="scss">
  .container {
    --quiz-bg: rgba(102, 102, 102, 0.274);
    padding: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  .container p {
    text-align: center;
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
    height: 350px;
  }

  .answers button {
    padding: 8px 28px;
    min-height: 42px;
    background-color: var(--quiz-bg);
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
    margin-bottom: 15px;
    font-size: 24px;
    font-weight: 500;
    padding: 8px 28px;
    min-height: 42px;
    background-color: var(--quiz-bg);
    border-radius: 8px;
    border: var(--acm-blue) 3px solid;
    cursor: pointer;
    transition: box-shadow 0.25s ease-in-out;
  }

  .action-btn {
    font-weight: 600;
    font-size: 18px;
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

  .team-title {
    color: var(--team-color);
  }

  .match-title {
    color: var(--team-color);
    font-size: 42px;
  }

  span {
    color: var(--acm-dark);
  }

  .result-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
  }

  .result-grid-box {
    padding: 16px 24px;
    min-height: 42px;
    background-color: var(--quiz-bg);
    border-radius: 8px;
    border: var(--border-color) 3px solid;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    transition: box-shadow 0.25s ease-in-out;
  }

  .team-icon {
    width: 50%;
    height: 50%;
  }

  .result-grid-box:hover {
    box-shadow: 0px 0px 10px var(--border-color);
  }

  .return-to-results {
    margin-top: 20px;
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  @media screen and (max-width: 740px) {
    .result-grid {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 20px;
    }
    .result-grid-box {
      width: 200px;
      height: 150px;
    }
  }
</style>
