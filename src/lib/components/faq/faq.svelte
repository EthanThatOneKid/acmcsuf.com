<script lang="ts">
  export let question: string;
  export let answer: string;
</script>

<div class="container">
  <h3>{question}</h3>
  <p>{answer}</p>
</div>

<style>
  /*Add temporary style, to be changed later*/
  .container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    border-radius: 8px;
  }

  h3 {
    color: var(--acm-darker);
  }

  p {
    color: var(--acm-darker);
  }
</style>
