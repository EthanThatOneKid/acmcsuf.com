<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';

  import { QUIZ_DATA } from '$lib/public/quiz/questions/data';
  import Quiz from './quiz.svelte';
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<Quiz data={QUIZ_DATA} />

<Spacing --min="175px" --med="200px" --max="200px" />
