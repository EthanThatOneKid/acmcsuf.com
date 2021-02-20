<script lang="ts">
  import CallToAction from "../../components/ui/call-to-action.svelte";
</script>

<section class="info-screen screen-wyd">
  <div>
    <h2>so what you are waiting for?</h2>
    <p>
      We invite you to become a part of our chapter consisting of
      <b>350<span class="plus">+</span> members</b>, and rising! All of our
      coding workshops, info sessions, and community events were designed to
      start off your tech journey on the right foot.
    </p>
    <CallToAction text="join us today!" />
  </div>
</section>

<style lang="scss">
  @import "../../style/theme.scss";

  .screen-wyd {
    background: none;
    padding-bottom: 333px;

    div {
      @include fluidSize(10, 150, $propName: "padding-left");
      @include fluidSize(10, 150, $propName: "padding-right");
      @include fluidSize(
        $minPFontSize,
        $maxPFontSize,
        $propName: "padding-bottom"
      );

      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

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
        @include fluidSize(
          $minPFontSize,
          $maxPFontSize,
          $propName: "padding-bottom"
        );
        margin: 0;

        span.plus {
          color: $acmBlue;
        }
      }
    }
  }
</style>
