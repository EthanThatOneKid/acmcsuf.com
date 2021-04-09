<script>
  import Hero from "@/components/sections/hero.svelte";
  import WhyJoin from "@/components/sections/why-join.svelte";
  import WhatAreYouWaitingFor from "@/components/sections/what-are-you-waiting-for.svelte";
</script>

<Hero />
<WhyJoin />

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

  @media screen and (max-width: 768px) {
  }

  .screen-paths {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .screen-path .paths-intro {
    padding-top: 333px;
    padding-bottom: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .screen-path .paths-intro h2 {
    margin: 0;
    font-size: var(--min-p-font-size);
    padding-bottom: 10;
    @include fluidSize($minHFontSize, $maxHFontSizeMed);
    @include fluidSize(10, 32, $propName: "padding-bottom");
    text-align: center;
    font-weight: bold;
  }

  .screen-path .paths-intro p {
    font-size: var(--min-p-font-size);
    width: 190px;
    line-height: 18px;
    margin: 0;
    align-content: center;
    text-align: center;
  }

  .screen-path .paths-display {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  .screen-path .paths-display .path-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $acmDark;
    text-decoration: none;

    .screen-path .paths-display .path-item object {
      @include fluidSize(36, 250, $propName: "width");
      @include fluidSize(36, 250, $propName: "height");
    }
    .screen-path .paths-display .path-item span {
      @include fluidSize(18, 36);
    }

    @media screen and (max-width: 768px) {
      .screen-path .paths-intro h2 {
        font-size: var(--max-h-font-size-med);
        padding-bottom: 32px;
      }

      .screen-path .paths-intro p {
        font-size: var(--max-p-font-size);
        width: 1310px;
        line-height: 54px;
      }

      .screen-path .paths-display {
        flex-direction: column;
      }

      .screen-path .paths-display .path-item {
        padding-top: 1em;
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
  }
</style>
