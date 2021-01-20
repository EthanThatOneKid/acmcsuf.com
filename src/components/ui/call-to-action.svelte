<script lang="ts">
  export let link: string = "#";
  export let text: string = "";
</script>

<a class="call-to-action" href={link}>{text}</a>

<style lang="scss">
  @import "../../style/theme.scss";

  .call-to-action {
    cursor: pointer;
    border-radius: 25px;
    background-color: $acmDark;
    padding: 16px 8px 16px 8px;
    font-weight: bold;
    color: $acmLight;
    text-decoration: none;
    border: 2px solid $acmDark;
    @include fluidSize(18, 48, $propName: "font-size");
    @include fluidSize(12, 32, $propName: "padding-left");
    @include fluidSize(12, 32, $propName: "padding-right");
    @include fluidSize(12, 32, $propName: "padding-top");
    @include fluidSize(12, 32, $propName: "padding-bottom");

    &:hover {
      transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
      color: $acmDark;
      background-color: $acmLight;
    }
  }
</style>
