<script lang="ts">
  export let link: string = "#";
  export let text: string = "Submit";
</script>

<a class="call-to-action" href="{link}">{text}</a>

<style>
  .call-to-action {
    cursor: pointer;
    border-radius: 25px;
    background-color: var(--acm-dark);
    padding: 16px 8px 16px 8px;
    font-weight: bold;
    color: var(--acm-light);
    text-decoration: none;
    border: 2px solid var(--acm-dark);
    font-size: 1rem;
    padding: 1em;
    text-transform: lowercase;
  }

  .call-to-action:hover {
    transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
    color: var(--acm-blue);
    background-color: var(--acm-light);
  }

  @media (min-width: 768px) {
    .call-to-action {
      font-size: 2rem;
    }
  }
</style>
