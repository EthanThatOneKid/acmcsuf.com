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
    max-width: 950px;
    text-align: left;
    padding: 12px;
    margin: 0px 25px;
    gap: 16px;
  }

  @media (min-width: 768px) {
    .faq-container {
      grid-template-columns: 1fr 1fr;
      padding: 16px;
      margin: 0px 45px;
      justify-self: center;
    }
  }
</style>
