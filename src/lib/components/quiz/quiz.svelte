<script lang="ts">
  import { QuizData, QuizStorage, TeamMatch } from '$lib/quiz';
  import { AcmPath, acmAlgo, acmDev, acmDesign, acmAI, acmGeneral } from '$lib/constants/acm-paths';
  import { onMount } from 'svelte';
  import ProgressBar from '$lib/components/quiz/progress-bar.svelte';
  import LeftArrow from '$lib/components/icons/left-arrow.svelte';
  import RightArrow from '$lib/components/icons/right-arrow.svelte';
  import MoreInfo from './more-info.svelte';

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
  let responses: TeamMatch[] | undefined;
  let answeredAllQuestions = false;
  // local storage stuff
  let quizStorage: QuizStorage | undefined;
  $: {
    answeredAllQuestions =
      responses?.length === data.questions.length && !responses.includes(undefined);
    // Updates local storage whenever `responses` changes.
    quizStorage && quizStorage.setResponses(responses);
  }
  let showResults = false;
  let showMoreInfo = false;
  let showTeam: AcmPath;

  $: talliedResponses = (responses ?? []).reduce((tallies, match) => {
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
    responses = quizStorage.getResponses();
    showResults = responses?.length === data.questions.length && !responses.includes(undefined);
  });
</script>

<div class="container">
  <!-- DISPLAY THE QUIZ QUESTIONS -->
  {#if !showResults}
    <h1>ACM TEAM QUIZ</h1>
    <div class="question">
      <h2>{data.questions[index].prompt}</h2>
      <section class="answers">
        {#each data.questions[index].choices as choice (choice.content)}
          <button
            on:click={() => recordAnswer(choice.match)}
            class:selected-response={(responses ?? [])[index] === choice.match}
          >
            <h3>{choice.content}</h3>
          </button>
        {/each}
      </section>
    </div>
    <div class="arrow-wrapper">
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
    <button on:click={goBackToResults} class={`arrow return-to-results`}
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
    <button on:click={restartQuiz} class="arrow action-btn restart-btn">
      <h3>Take Quiz Again?</h3>
      <p class="italic">This will wipe your current results</p>
    </button>
    <button class="arrow action-btn" on:click={() => showTeamDetails(TEAMLESS['N/A'])}
      >Want to help out ACM?</button
    >
    <p class="italic fine-text">
      Take these results with a grain of salt. This is meant to be a fun little quiz and you are
      more than welcomed to try them all.
    </p>
  {/if}
</div>

<style lang="scss">
  .container {
    padding: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
  }

  .container p {
    text-align: center;
  }

  // Quiz Styles

  .question {
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
  }

  .question h2 {
    text-align: center;
  }

  .answers {
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 350px;
  }

  .answers button {
    padding: 8px 28px;
    min-height: 42px;
    background-color: var(--quiz-bg);
    border-radius: 8px;
    border: var(--acm-blue) 3px solid;
    cursor: pointer;
    transition: 0.25s ease-in-out;
  }

  .answers button:hover {
    box-shadow: 0px 0px 10px var(--acm-blue);
  }

  .selected-response {
    box-shadow: 0px 0px 15px var(--acm-sky);
  }

  .selected-response h3 {
    font-style: italic;
    text-shadow: 0px 0px 2px var(--acm-sky);
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

  .action-btn {
    font-weight: 600;
    font-size: 18px;
    padding: 8px 16px;
  }

  .action-btn p {
    font-weight: 500;
    font-size: 12px;
  }

  .submitBTN {
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

  .restart-btn {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    font-weight: 400;
    gap: 5px;
  }

  .submitBTN:hover {
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

  .italic {
    font-style: italic;
  }

  .fine-text {
    width: 510px;
    font-weight: 500;
    color: var(--acm-blue);
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
    .question {
      width: 325px;
    }

    .answers {
      width: 250px;
    }

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

    .fine-text {
      width: 325px;
    }
  }

  :global(.light) {
    --quiz-bg: rgba(243, 243, 243, 0.795);
  }

  :global(.dark) {
    --quiz-bg: #6868682a;
  }

  @media (prefers-color-scheme: light) {
    body:not(.dark) {
      --quiz-bg: rgba(243, 243, 243, 0.795);
    }
  }

  @media (prefers-color-scheme: dark) {
    body:not(.light) {
      --quiz-bg: #6868682a;
    }
  }
</style>
