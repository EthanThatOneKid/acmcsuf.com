<script lang="ts">
  import Headline from "../../components/sections/headline.svelte";
  import WhatAreYouWaitingFor from "../../components/sections/what-are-you-waiting-for.svelte";
</script>

<section class="about-screen-hero">
  <div>
    <Headline>paths</Headline>
    <div class="about-description-container">
      <h2 class="brand-em">
        <span class="brand-em">what are paths?</span>
      </h2>
      <p>
        <span class="brand-em">paths</span> are committees that focus on certain
        areas related to the industry. students can discover new interests,
        enhance current skillsets, and specialize in specific fields through
        these committees. <span class="brand-em">paths</span> were designed to encourage
        teamwork and communication to prepare people for real-world opportunities
        in tech.
      </p>
    </div>
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
</style>
