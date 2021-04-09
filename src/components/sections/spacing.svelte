<script lang="ts">
  import { styleProps } from "../../actions/use-style-props";
  export let amount: string = "100px";
</script>

<div use:styleProps="{{ 'spacing-height': amount }}"></div>

<style>
  div {
    height: var(--spacing-height);
  }
</style>
