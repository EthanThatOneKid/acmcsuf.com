<script lang="ts">
  import { styleProps } from "../../actions/use-style-props";
  export let amount: string = "100px";
  export let minAmount: string = amount;
  export let maxAmount: string = amount;
</script>

<div
  use:styleProps="{{
    'min-spacing-height': minAmount,
    'med-spacing-height': amount,
    'max-spacing-height': maxAmount,
  }}"
></div>

<style>
  div {
    height: var(--min-spacing-height);
  }

  @media screen and (min-width: 768px) {
    div {
      height: var(--med-spacing-height);
    }
  }

  @media screen and (min-width: 1440px) {
    div {
      height: var(--max-spacing-height);
    }
  }
</style>
