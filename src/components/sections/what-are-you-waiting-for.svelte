<script lang="ts">
  import CallToAction from "../../components/ui/call-to-action.svelte";
</script>

<section class="info-screen screen-wyd">
  <div>
    <h2>so what you are waiting for?</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima animi iure
      cupiditate? Vel quisquam ratione, voluptate ex neque eaque inventore.
    </p>
    <CallToAction text="join us today!" />
  </div>
</section>

<style lang="scss">
  @import "../../style/theme.scss";

  .screen-wyd {
    background: 90% 50% no-repeat url(../assets/badges/acm-blank.svg);

    div {
      @include fluidSize(10, 128, $propName: "padding-left");
      @include fluidSize(
        $minPFontSize,
        $maxPFontSize,
        $propName: "padding-bottom"
      );
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-top: 333px;

      h2 {
        @include fluidSize($minHFontSize, $maxHFontSizeMed);
        @include fluidSize(
          $minPFontSize,
          $maxPFontSize,
          $propName: "padding-bottom"
        );
        font-weight: bold;
        margin: 0;
      }
      p {
        @include fluidSize($minPFontSize, $maxPFontSize);
        @include fluidSize(150, 1014, $propName: "width");
        @include fluidSize(
          $minPFontSize,
          $maxPFontSize,
          $propName: "padding-bottom"
        );
        margin: 0;
      }
    }
  }
</style>
