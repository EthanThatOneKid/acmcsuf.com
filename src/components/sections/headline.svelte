<script lang="ts">
  export let src: string = "../assets/badges/PNG/acm-csuf-badge.png";
</script>

<div class="subpage-title-container">
  <object type="image/png" data="{src}" title="acm-csuf-logo"></object>
  <h1 class="brand-em"><slot /></h1>
</div>

<style lang="scss">
  @import "../../style/theme.scss";

  .subpage-title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    object {
      @include fluidSize(25, 250, $propName: "width");
      @include fluidSize(25, 250, $propName: "height");
    }
    h1 {
      @include fluidSize($minHFontSize, $maxHFontSize);
      @include fluidSize(18, 48, $propName: "padding-left");
    }
  }
</style>
