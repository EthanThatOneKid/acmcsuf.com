<script lang="ts">
  export let link = '#';
  export let text = 'Submit';
</script>

<a
  class="call-to-action headers"
  role="button"
  href={link}
  target="_blank"
  rel="noopener norefferer">{text}</a
>

<style lang="scss">
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
    transition: color 0.25s ease-in-out;
  }
  .call-to-action:hover {
    color: var(--acm-blue);
  }
</style>
