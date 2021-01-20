<script>
  import WhatAreYouWaitingFor from "../components/sections/what-are-you-waiting-for.svelte";
  import CallToAction from "../components/ui/call-to-action.svelte";
</script>

<section class="info-screen screen-hero">
  <div>
    <h1 class="intro-header">
      we are the largest tech
      <br />
      community at
      <span class="brand-em brand-blue">CSUF</span>
    </h1>
    <CallToAction text="join us today!" />
  </div>
</section>

<section class="info-screen screen-why-join">
  <div>
    <h2>why should students join acm?</h2>
    <p>
      <span class="brand-em">acm<span class="brand-blue">CSUF</span></span>
      strives to be a communit that encourages growth, friendship, and personal/technical
      development to prepare people for challenges in their personal lives, school
      lives, and industry lives.
    </p>
  </div>
</section>

<section class="info-screen screen-paths">
  <div>
    <div class="paths-intro">
      <h2>get involved with our paths!</h2>
      <p>
        want to specialize somewhere specific in tech? our paths were designed
        to give students a head start in their own tech journeys, making them
        prepared for the industry.
      </p>
    </div>
    <div class="paths-display">
      <div class="path-item">
        <object
          type="image/svg+xml"
          data="assets/badges/with-shadow/acm-algo-badge-s.svg"
          title="acm-algo-logo"
        />
        <span class="brand-em">acm<span class="brand-purple">Algo</span> </span>
      </div>
      <div class="path-item">
        <object
          type="image/svg+xml"
          data="assets/badges/with-shadow/acm-create-badge-s.svg"
          title="acm-create-logo"
        />
        <span class="brand-em">acm<span class="brand-pink">Create</span> </span>
      </div>
      <div class="path-item">
        <object
          type="image/svg+xml"
          data="assets/badges/with-shadow/acm-dev-badge-s.svg"
          title="acm-dev-logo"
        />
        <span class="brand-em">acm<span class="brand-bluer">Dev</span> </span>
      </div>
    </div>
  </div>
</section>

<WhatAreYouWaitingFor />

<style lang="scss">
  @import "../style/theme.scss";

  .screen-hero {
    background: 90% 50% no-repeat url(../assets/badges/acm-blank.svg);

    div {
      @include fluidSize(10, 128, $propName: "margin-left");
      padding-top: 221px;
      min-width: "max-content";
      h1 {
        @include fluidSize($minHFontSize, $maxHFontSize);
        @include fluidSize(
          $minPFontSize,
          $maxPFontSize,
          $propName: "padding-bottom"
        );
        font-weight: bold;
      }
    }
  }

  .screen-why-join {
    background: 10% 50% no-repeat url(../assets/badges/acm-blank.svg);

    div {
      @include fluidSize(10, 128, $propName: "padding-right");
      padding-top: 333px;
      h2 {
        @include fluidSize($minHFontSize, $maxHFontSizeMed);
        @include fluidSize(10, 32, $propName: "padding-bottom");
        font-weight: bold;
        text-align: right;
        margin: 0;
      }
      p {
        @include fluidSize($minPFontSize, $maxPFontSize);
        @include fluidSize(150, 1014, $propName: "width");
        text-align: right;
        float: right;
        margin: 0;
      }
    }
  }

  .screen-paths {
    display: flex;
    flex-direction: column;

    .paths-intro {
      padding-top: 333px;
      padding-bottom: 64px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h2 {
        margin: 0;
        @include fluidSize($minHFontSize, $maxHFontSizeMed);
        @include fluidSize(10, 32, $propName: "padding-bottom");
        text-align: center;
        font-weight: bold;
      }
      p {
        @include fluidSize($minPFontSize, $maxPFontSize);
        @include fluidSize(190, 1310, $propName: "width");
        @include fluidSize(18, 54, $propName: "line-height");
        margin: 0;
        align-content: center;
        text-align: center;
      }
    }
    .paths-display {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;

      .path-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        object {
          @include fluidSize(36, 250, $propName: "width");
          @include fluidSize(36, 250, $propName: "height");
        }
        span {
          @include fluidSize(18, 36);
        }
      }
    }
  }

  .screen-node-buds {
    background: 10% 50% no-repeat url(../assets/badges/acm-blank.svg);

    div {
      @include fluidSize(10, 128, $propName: "padding-right");
      padding-top: 333px;
      h2 {
        @include fluidSize($minHFontSize, $maxHFontSizeMed);
        @include fluidSize(10, 32, $propName: "padding-bottom");
        font-weight: bold;
        text-align: right;
        margin: 0;
      }
      p {
        @include fluidSize($minPFontSize, $maxPFontSize);
        @include fluidSize(150, 1014, $propName: "width");
        text-align: right;
        float: right;
        margin: 0;
      }
    }
  }
</style>
