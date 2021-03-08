<script>
  import Hero from "@/components/sections/hero.svelte";
  import WhatAreYouWaitingFor from "@/components/sections/what-are-you-waiting-for.svelte";
  import CallToAction from "@/components/ui/call-to-action.svelte";
</script>

<Hero />

<!-- <section class="info-screen screen-hero">
  <div>
    <h1 class="intro-header">
      <span class="headers">
        we are the largest tech
        <br />
        community at
      </span>
      <span class="brand-em brand-blue">CSUF</span>
    </h1>
    <CallToAction text="join us today!" />
  </div>
</section> -->

<section class="info-screen screen-why-join">
  <div>
    <h2><span class="headers">why should students join acm?</span></h2>
    <p>
      <span class="headers">acm</span><span class="brand-blue brand-em"
        >CSUF</span
      >
      strives to be a community that encourages growth, friendship, and personal/technical
      development to prepare people for challenges in their personal lives, school
      lives, and industry lives.
    </p>
  </div>
</section>

<section class="info-screen screen-paths">
  <div>
    <div class="paths-intro">
      <h2><span class="headers">get involved with our paths!</span></h2>
      <p>
        Want to specialize somewhere specific in tech? Our paths were designed
        to give students a head start in their own tech journeys, making them
        prepared for the industry.
      </p>
    </div>
    <div class="paths-display">
      <a class="path-item" href="/paths#acm-algo">
        <object
          type="image/svg+xml"
          data="assets/badges/with-shadow/acm-algo-badge-s.svg"
          title="acm-algo-logo"></object>
        <span class="headers"
          >acm<span class="brand-purple brand-em">Algo</span>
        </span></a
      >
      <a class="path-item" href="/paths#acm-create">
        <object
          type="image/svg+xml"
          data="assets/badges/with-shadow/acm-create-badge-s.svg"
          title="acm-create-logo"></object>
        <span class="headers"
          >acm<span class="brand-pink brand-em">Create</span>
        </span>
      </a>
      <a class="path-item" href="/paths#acm-dev">
        <object
          type="image/svg+xml"
          data="assets/badges/with-shadow/acm-dev-badge-s.svg"
          title="acm-dev-logo"></object>
        <span class="headers"
          >acm<span class="brand-bluer brand-em">Dev</span>
        </span>
      </a>
    </div>
  </div>
</section>

<WhatAreYouWaitingFor />

<style lang="scss">
  @import "../style/theme.scss";

  // .screen-hero {
  //   background: 90% 50% no-repeat url(../assets/badges/acm-blank.svg);

  //   div {
  //     @include fluidSize(10, 128, $propName: "margin-left");
  //     padding-top: 221px;
  //     min-width: "max-content";
  //     h1 {
  //       @include fluidSize($minHFontSize, $maxHFontSize);
  //       @include fluidSize(
  //         $minPFontSize,
  //         $maxPFontSize,
  //         $propName: "padding-bottom"
  //       );
  //       font-weight: bold;
  //     }
  //   }
  // }

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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;

      .path-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: $acmDark;
        text-decoration: none;

        object {
          @include fluidSize(36, 250, $propName: "width");
          @include fluidSize(36, 250, $propName: "height");
        }
        span {
          @include fluidSize(18, 36);
        }
      }
    }
    @media screen and (max-width: $breakpoint) {
      .paths-display {
        flex-direction: column;
        .path-item {
          padding-top: 1em;
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
