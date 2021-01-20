<script lang="ts">
  import WhatAreYouWaitingFor from "../../components/sections/what-are-you-waiting-for.svelte";
  import { officers } from "./_officers";
  import { styleProps } from "../../actions/use-style-props";
</script>

<section class="about-screen-hero">
  <div>
    <div class="about-title-container">
      <object
        type="image/png"
        data="../assets/badges/PNG/acm-csuf-badge.png"
        title="acm-csuf-logo"
      />
      <h1 class="about-intro-header brand-em">about</h1>
    </div>
    <div class="about-description-container">
      <h2 class="brand-em">
        what is acm<span class="brand-blue">CSUF</span>
      </h2>
      <p>
        <span class="brand-em">acm<span class="brand-blue">CSUF</span></span>
        is a student-ran chapter of the association for computing machinery. we focus
        on introducing and getting students involved in tech, as well as educating
        students about the field through workshops, presentations, livestreams, and
        more. our events are open to any and everyone, so be sure to come by!
      </p>
    </div>
  </div>
</section>

<section class="about-screen-who-are-we">
  <div class="officers-2020-2021-container">
    {#each officers as { name, title, picture, url } (name)}
      <div class="officer-container">
        <div
          class="officer-image"
          use:styleProps={{
            "officer-image-url": `url(../assets/authors/${picture})`,
          }}
        />
        <h3>
          {#if url !== undefined}
            <a href={url}>{name}</a>
          {:else}
            {name}
          {/if}
        </h3>
        <p>{title}</p>
      </div>
    {/each}
  </div>
</section>

<WhatAreYouWaitingFor />

<style lang="scss">
  @import "../../style/theme.scss";

  .about-screen-hero {
    padding-top: 100px;
    div {
      display: flex;
      flex-direction: column;

      .about-title-container {
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

      .about-description-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        h2 {
          @include fluidSize($minHFontSize, $maxHFontSizeMed);
          text-align: center;
          font-weight: bold;
        }
        p {
          @include fluidSize($minPFontSize, $maxPFontSize);
          @include fluidSize(220, 1500, $propName: "width");
          text-align: center;
        }
      }
    }
  }

  .about-screen-who-are-we {
    .officers-2020-2021-container {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      .officer-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 64px;
        .officer-image {
          width: 200px;
          height: 200px;
          background-image: var(--officer-image-url);
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }
        h3 {
          font-size: 24px;
          color: $acmDark;
        }
        span {
          font-size: 18px;
          color: grey;
        }
      }
    }
  }
</style>
