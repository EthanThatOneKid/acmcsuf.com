<script lang="ts">
  import WhatAreYouWaitingFor from "../../components/sections/what-are-you-waiting-for.svelte";
  import { officers } from "../../lib/officers";
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
  <h2 class="brand-em">
    who is acm<span class="brand-blue">CSUF</span>
    <!-- center this -->
  </h2>
  <div class="officers-2020-2021-container">
    {#each officers as { name, title, picture, url }, i (name)}
      <div class="officer-container">
        <svg class="officer-image" viewBox="1 1 8 8">
          <pattern
            id={`officer-image-${i}`}
            patternUnits="userSpaceOnUse"
            width={10}
            height={10}>
            <image
              width={10}
              height={10}
              xlink:href={`../assets/authors/${picture || "placeholder.png"}`}
            />
          </pattern>
          <path
            d="M5.5 1.5 L8.5 4.5 Q9 5 8.5 5.5 L5.5 8.5 Q5 9 4.5 8.5 L 1.5 5.5 Q1 5 1.5 4.5 L4.5 1.5 Q 5 1 5.5 1.5z"
            fill={`url(#officer-image-${i})`}
          />
        </svg>
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
        }
        h3 {
          font-size: 24px;
          color: $acmDark;

          a {
            color: $acmDark;
            text-decoration: none;
          }
        }
        span {
          font-size: 18px;
          color: grey;
        }
      }
    }
  }
</style>
