<script lang="ts">
  import { onMount } from 'svelte';
  import type { Team } from '$lib/public/board/types';
  import { TEAMS } from '$lib/public/board/data';
  import { getTeamReport } from '$lib/public/quiz/responses/data';
  import type { QuizData, QuizResponse } from '$lib/public/quiz/questions/types';
  import type { TeamMatch } from '$lib/public/quiz/questions/types';
  import { QuizStorage } from '$lib/public/quiz/responses/storage';
  import ProgressBar from './progress-bar.svelte';
  import MoreInfo from './more-info.svelte';

  export let data: QuizData;

  let index = 0;

  let responses: (QuizResponse | undefined)[] = [];
  let answeredAllQuestions = false;

  let showResults = false;
  let showMoreInfo = false;
  let showTeam: Team;

  const excludedTeamIDs = ['marketing', 'general', 'special-events', 'nodebuds'];

  function goLeft() {
    if (index > 0) index--;
  }

  function goRight() {
    if (index < data.questions.length - 1) {
      index++;
    }
  }

  function recordAnswer(matches: TeamMatch[], choiceIndex: number) {
    responses[index] = { matches, choiceIndex };
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
    if (quizStorage) {
      quizStorage.clearResponses();
    }
  }

  function showTeamDetails(currentTeam: Team) {
    showMoreInfo = true;
    showTeam = currentTeam;
  }

  function goBackToResults() {
    showMoreInfo = false;
  }

  function tallyResponses(responses: (QuizResponse | undefined)[]) {
    return (responses ?? []).reduce((tallies, matches) => {
      if (matches === undefined) {
        return tallies;
      }

      for (let match of matches?.matches ?? []) {
        match = match?.toLowerCase() as TeamMatch;
        if (match && tallies[match]) {
          tallies[match]++;
        } else if (match) {
          tallies[match] = 1;
        }
      }
      return tallies;
    }, {} as Record<string, number>);
  }

  function maxTallies(tallies: Record<string, number>) {
    return Object.entries(tallies)
      .sort(([, a], [, b]) => b - a)
      .shift()
      ?.shift() as TeamMatch;
  }

  function totalTallies(tallies: Record<string, number>) {
    let totalTallies = 0;
    Object.values(tallies).forEach((value) => (totalTallies += value));
    return totalTallies;
  }

  // recalculates the percentages and adjusts them to add up to 100%
  function calculatePercentages(talliedResponses: Record<string, number>, totalTallies: number) {
    let sum = 0;
    let highest = '';
    let secondHighest = '';
    let highestNum = 0;
    let res: Record<string, number> = {};
    for (const [key, value] of Object.entries(talliedResponses)) {
      const percentage = Math.round((value / totalTallies) * 100);
      sum += percentage;
      if (value >= highestNum) {
        if (highest && value == highestNum) {
          secondHighest = key;
        } else {
          if (highest) secondHighest = highest;
          highest = key;
          highestNum = value;
        }
      } else if (secondHighest && value > talliedResponses[secondHighest]) {
        secondHighest = key;
      } else if (!secondHighest) {
        secondHighest = key;
      }
      res[key] = percentage;
    }
    if (sum < 100) {
      // if the sum of percentages is less than 100, add the difference to the highest percentage
      res[highest] += 100 - sum;
    } else if (sum > 100) {
      // if the sum of percentages is greater than 100, subtract the difference from the second highest percentage
      res[secondHighest] -= sum - 100;
    }
    return res;
  }

  $: talliedResponses = tallyResponses(responses);

  $: match = maxTallies(talliedResponses);

  $: sumOfTallies = totalTallies(talliedResponses);

  $: calculatedPercentages = calculatePercentages(talliedResponses, sumOfTallies);

  // local storage stuff
  let quizStorage: QuizStorage | undefined;
  $: {
    answeredAllQuestions =
      responses?.length === data.questions.length && !responses.includes(undefined);
    // Updates local storage whenever `responses` changes.
    if (quizStorage && responses) {
      quizStorage.setResponses(responses);
    }
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
    <p><i>Which team are you a part of?</i></p>
    <div class="question">
      <h2>{data.questions[index].prompt}</h2>
      <section class="answers">
        {#each data.questions[index].choices as choice, i (choice.content)}
          <button
            on:click={() => recordAnswer(choice.match, i)}
            class:selected-response={(responses ?? [])[index]?.choiceIndex === i}
          >
            <h3>{choice.content}</h3>
          </button>
        {/each}
      </section>
    </div>
    <div class="back-next-wrapper">
      <button
        on:click={goLeft}
        disabled={index === 0}
        class:disable-back-next={index === 0}
        class="back-next-btn"
      >
        Back</button
      >
      <button
        on:click={goRight}
        disabled={index === data.questions.length - 1 || !(responses ?? [])[index]}
        class:disable-back-next={index === data.questions.length - 1 || !(responses ?? [])[index]}
        class="back-next-btn">Next</button
      >
    </div>
    <button
      on:click={submitResponses}
      disabled={!answeredAllQuestions}
      class:disable-submitBTN={!answeredAllQuestions}
      class="submitBTN">Submit</button
    >

    <!-- DISPLAY ADDIONTAL TEAM INFORMATION -->
  {:else if showMoreInfo}
    <MoreInfo team={showTeam} report={getTeamReport(showTeam.id)} />
    <button on:click={goBackToResults} class="back-next-btn return-to-results">
      <h3>Check out other teams</h3></button
    >
    <!-- DISPLAY THE RESULTS -->
  {:else}
    <h1>Quiz Results</h1>
    <p>You Matched</p>
    <h2 class="match-title" style={`--team-color: ${TEAMS[match].color}`}>
      {match} <span>Team</span>
    </h2>
    <p>Click the teams below to see your next step</p>
    <div class="result-grid">
      <div
        class="result-grid-box"
        on:click|preventDefault|stopPropagation={() => showTeamDetails(TEAMS[match])}
        on:keydown|preventDefault|stopPropagation={() => showTeamDetails(TEAMS[match])}
        style={`--border-color: ${TEAMS[match].color}`}
        role="button"
        tabindex="0"
      >
        <h2 class="team-title" style={`--team-color: ${TEAMS[match].color}`}>
          {match} <span>Team</span>
        </h2>
        <img src={TEAMS[match].logoSrc} alt={`${match} icon`} class="team-icon" />
        <ProgressBar progress={calculatedPercentages[match]} fillColor={TEAMS[match].color} />
      </div>
      {#each Object.entries(TEAMS).filter(([otherMatch]) => otherMatch !== match && !excludedTeamIDs.includes(otherMatch)) as [otherMatch, team] (otherMatch)}
        <div
          class="result-grid-box"
          style={`--border-color: ${team.color}`}
          on:click|preventDefault|stopPropagation={() => showTeamDetails(team)}
          on:keydown|preventDefault|stopPropagation={() => showTeamDetails(team)}
          role="button"
          tabindex="0"
        >
          <h2 class="team-title" style={`--team-color: ${team.color}`}>
            {otherMatch} <span>Team</span>
          </h2>
          <img src={team.logoSrc} alt={`${otherMatch} icon`} class="team-icon" />

          <ProgressBar
            progress={talliedResponses[otherMatch] ? calculatedPercentages[otherMatch] : 0}
            fillColor={team.color}
          />
        </div>
      {/each}
    </div>
    <button on:click={restartQuiz} class="back-next-btn action-btn restart-btn">
      <h3>Take Quiz Again?</h3>
      <p class="italic">This will wipe your current results</p>
    </button>
    <button class="back-next-btn action-btn" on:click={() => showTeamDetails(TEAMS.general)}>
      Want to help out ACM?</button
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
    display: grid;
    gap: 20px;
    grid-template-columns: 50% 50%;
    width: 700px;
  }

  .answers button {
    padding: 25px 27px;
    height: 85px;
    background-color: var(--acm-bluer);
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: 0.25s ease-in-out;
  }

  .answers button:hover {
    border: 3px solid var(--acm-sky);
  }

  .selected-response {
    border: 3px solid var(--acm-blue);
  }

  .selected-response h3 {
    font-style: italic;
  }

  .back-next-wrapper {
    display: flex;
    gap: 30px;
  }

  .back-next-btn {
    background-color: var(--acm-bluer);
    border: var(--acm-bluer) 3px solid;
    border-radius: 30px;
    padding: 13px 45px;
    transition: 0.25s ease-in-out;
  }

  .back-next-btn:hover {
    border: 3px solid var(--acm-midnight);
  }

  .action-btn {
    font-weight: 600;
    font-size: 18px;
    padding: 10px 30px;
    align-items: center;
  }

  .action-btn p {
    font-weight: 500;
    font-size: 12px;
  }

  .submitBTN {
    font-size: 24px;
    font-weight: 500;
    padding: 16px 28px;
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
    border: 3px solid var(--acm-midnight);
  }

  .disable-submitBTN,
  .disable-back-next {
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
    gap: 35px;
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
    .answers button {
      height: 90px;
    }

    .answers {
      width: 290px;
      height: 450px;
      grid-template-columns: 100%;
    }

    .result-grid {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 40px;
    }

    .result-grid-box {
      width: 200px;
      height: 235px;
    }

    .fine-text {
      width: 325px;
    }
  }

  :global(html[data-theme='light']) {
    --quiz-bg: rgba(243, 243, 243, 0.795);
  }

  :global(html[data-theme='dark']) {
    --quiz-bg: #6868682a;
  }

  @media (prefers-color-scheme: light) {
    :global(html[data-theme='light']) {
      --quiz-bg: rgba(243, 243, 243, 0.795);
    }
  }

  @media (prefers-color-scheme: dark) {
    :global(html[data-theme='dark']) {
      --quiz-bg: #6868682a;
    }
  }
</style>
