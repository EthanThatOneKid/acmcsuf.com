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
    user-select: none;
    background-color: none;
    padding: 8px 16px 8px 16px;
    margin-top: 24px;
    font-weight: bold;
    color: var(--acm-dark);
    text-decoration: none;
    border: 2px solid var(--acm-dark);
    font-size: var(--body-font-size);
    text-transform: lowercase;
    box-shadow: 0 0 0 rgba(23, 26, 28, 0.1);
    transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out,
      -webkit-filter 0.25s ease-in-out, filter 0.25s ease-in-out;
  }

  .call-to-action:hover {
    transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
    color: var(--acm-light);
    background-color: var(--acm-dark);
    -webkit-filter: drop-shadow(0 2px 10px rgba(23, 26, 28, 0.5));
    filter: drop-shadow(0 2px 10px rgba(23, 26, 28, 0.5));
  }
</style>
