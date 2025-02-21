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
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 16px;
    margin: 0px 45px;
    gap: 16px;
  }

  h3 {
    color: var(--acm-darker);
  }

  p {
    color: var(--acm-darker);
  }

  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
      padding: 12px;
      margin: 0px 25px;
    }
  }
</style>
