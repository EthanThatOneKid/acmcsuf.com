<script lang="ts">
  export let link: string = "#";
  export let text: string = "Submit";
</script>

<a class="call-to-action" href="{link}">{text}</a>

<style>
  .call-to-action {
    display: block;
    text-align: center;
    cursor: pointer;
    border-radius: 15px;
    background-color: var(--acm-dark);
    padding: 8px 16px 8px 16px;
    margin-top: 24px;
    font-weight: bold;
    color: var(--acm-light);
    text-decoration: none;
    border: 2px solid var(--acm-dark);
    font-size: var(--body-font-size);
    text-transform: lowercase;
  }

  .call-to-action:hover {
    transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
    color: var(--acm-blue);
    background-color: var(--acm-light);
  }
</style>
