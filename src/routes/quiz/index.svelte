<script lang="ts">
  import Quiz from '$lib/components/quiz/quiz.svelte';
  import { QUIZ_DATA } from '$lib/quiz';
  import Spacing from '$lib/components/sections/spacing.svelte';
</script>

<svelte:head>
  <title>Quiz | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<Quiz data={QUIZ_DATA} />

<Spacing --min="175px" --med="200px" --max="200px" />
