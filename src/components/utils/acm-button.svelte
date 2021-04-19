<script lang="ts">
  export let link: string = "#";
  export let text: string = "Submit";
</script>

<a class="acm-button" href="{link}" target="_blank">{text}</a>

<style>
  .acm-button {
    cursor: pointer;
    border-radius: 25px;
    background-color: var(--acm-dark);
    padding: 8px 16px 8px 16px;
    margin-top: 24px;
    font-weight: bold;
    color: var(--acm-light);
    text-decoration: none;
    border: 2px solid var(--acm-dark);
    font-size: 1rem;
    text-transform: lowercase;
  }

  .acm-button:hover {
    transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
    color: var(--acm-blue);
    background-color: var(--acm-light);
  }

  @media (min-width: 768px) {
    .acm-button {
      font-size: 2rem;
    }
  }
</style>
