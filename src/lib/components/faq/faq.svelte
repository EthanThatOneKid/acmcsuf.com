<script lang="ts">
  export let question: string;
  export let answer: string;
</script>

<div class="faq-container">
  <h3>{question}</h3>
  <p>{answer}</p>
</div>

<style>
  .faq-container {
    display: grid;
    grid-template-columns: 1fr;
    text-align: left;
    gap: 1rem;
    margin: 2rem 0px;
  }

  @media (min-width: 768px) {
    .faq-container {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
