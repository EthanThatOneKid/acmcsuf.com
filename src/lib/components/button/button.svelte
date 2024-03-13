<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let link = 'javascript:void(0)';
  export let redirect = false;
  export let text = 'Submit';

  const dispatcher = createEventDispatcher();

  function forwardClickEvent(ev: MouseEvent) {
    dispatcher('click', ev);
  }
</script>

<a
  class="acm-heavier size-md"
  role="button"
  href={link}
  target={redirect ? '_blank' : '_self'}
  rel="noopener norefferer"
  on:click={forwardClickEvent}
>
  {text}
</a>

<style lang="scss">
  a {
    display: block;
    text-align: center;
    padding: 12px 24px;
    background-color: var(--button-bg);
    color: var(--perma-light);
    border-radius: 12px;
    text-decoration: none;
    user-select: none;
    transition: 0.25s ease-in-out;

    &:hover {
      background-color: var(--button-hover);
    }
  }
</style>
