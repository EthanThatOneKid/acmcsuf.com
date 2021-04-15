<script lang="ts">
  import CallToAction from "@/components/utils/call-to-action.svelte";
</script>

<section class="info-screen screen-wyd">
  <div>
    <h2>how can i get involved?</h2>
    <p>
      Our paths host their own events all the time! Follow us on social media to
      get notified for when they happen. Until then, we invite you to become a
      part of our chapter to start off your tech journey on the right foot.
    </p>
    <CallToAction text="join us today!" />
  </div>
</section>

<style lang="scss">
  @import "../../style/theme.scss";

  .screen-wyd {
    background: none;
    height: auto;
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
