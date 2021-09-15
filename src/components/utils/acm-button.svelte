<script lang="ts">
  export let link: string = "#";
  export let text: string = "Submit";
</script>

<a class="call-to-action size-m" href="{link}">{text}</a>

<style lang="scss">
  @import "static/theme.scss";

  .call-to-action {
    display: block;
    text-align: center;
    cursor: pointer;
    user-select: none;
    text-decoration: none;
    border-radius: 12px;
    padding: 12px 24px;
    margin-top: 64px;
    background-color: var(--acm-dark);
    color: var(--acm-light);
    transition: background-color 0.25s ease-in-out;
  }

  .call-to-action:hover {
    background-color: var(--acm-blue);
  }
</style>
