<script lang="ts">
  import Headline from "./headline.svelte";
  export let src: string = undefined;
  export let title: string;
</script>

<div>
  <Headline src="{src}">{title}</Headline>
</div>

<style lang="scss">
  div {
    height: 80vh;
    width: 100%;
    background-color: #c4c4c4;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
