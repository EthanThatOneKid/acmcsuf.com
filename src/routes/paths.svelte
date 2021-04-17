<script lang="ts">
  import CommonHero from "@/components/sections/common-hero.svelte";
  import WhatAreYouWaitingFor from "@/components/sections/what-are-you-waiting-for.svelte";
  import Spacing from "@/components/sections/spacing.svelte";
</script>

<CommonHero>
  <h1 slot="title">paths</h1>
  <h2 slot="headline">what are paths?</h2>
  <p slot="text">
    <span class="brand-em">paths</span> are committees that focus on certain
    areas related to the industry. students can discover new interests, enhance
    current skillsets, and specialize in specific fields through these
    committees. <span class="brand-em">paths</span> were designed to encourage teamwork
    and communication to prepare people for real-world opportunities in tech.
  </p>
</CommonHero>

<Spacing />

<section class="paths-screen-info turnback">
  <div id="acm-algo">
    <object
      type="image/png"
      data="../assets/png/acm-algo-badge.png"
      title="acm-algo-logo"></object>
    <div>
      <h2>
        <span class="brand-em">acm<span class="brand-purple">Algo</span></span>
      </h2>
      <p>
        <span class="brand-em">acm<span class="brand-purple">Algo</span></span> is
        our committee dedicated to building the programming proficiency of students.
        This committee focuses on increasing knowledge and understanding of data
        structures/algorithms, enhancing problem-solving abilities, and exploring
        competitve programing.
      </p>
    </div>
  </div>
  <div id="acm-create">
    <object
      type="image/png"
      data="../assets/png/acm-create-badge.png"
      title="acm-create-logo"></object>
    <div>
      <h2>
        <span class="brand-em">acm<span class="brand-pink">Create</span></span>
      </h2>
      <p>
        <span class="brand-em">acm<span class="brand-pink">Create</span></span> is
        our committee dedicated to emphasizing the importance of product design.
        This committee focuses on designing the products of acmCSUF, educating students
        about the princples of UI/UX design, and exposing people to both technical
        and non-technical roles in the industry.
      </p>
    </div>
  </div>
  <div id="acm-dev">
    <object
      type="image/png"
      data="../assets/png/acm-dev-badge.png"
      title="acm-dev-logo"></object>
    <div>
      <h2>
        <span class="brand-em">acm<span class="brand-bluer">Dev</span></span>
      </h2>
      <p>
        <span class="brand-em">acm<span class="brand-bluer">Dev</span></span> is
        our committee dedicated to bringing students of all skill-levels together
        through the use of hands-on projects and activities. This committee introduces
        students to the software development process, to the different types of technologies
        used by industry, and enhances people’s passion in STEM.
      </p>
    </div>
  </div>
</section>

<Spacing amount="175px" />

<WhatAreYouWaitingFor />

<Spacing amount="175px" />

<style lang="scss">
  @import "../style/theme.scss";

  .paths-screen-hero {
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
          padding-bottom: 48px;
        }
        p {
          @include fluidSize($minPFontSize, $maxPFontSize);
          @include fluidSize(220, 1500, $propName: "width");
          text-align: center;
        }
      }
    }
  }

  .turnback {
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding-top: 100px;
      h2 {
        padding-bottom: 48px;
      }

      &:nth-child(even) {
        flex-flow: row-reverse;
        div {
          align-items: flex-start;
          p {
            text-align: left;
          }
        }
      }

      @media screen and (max-width: $breakpoint) {
        flex-direction: column;
        align-items: center;
        flex-flow: column !important;
        div {
          justify-content: center;
          align-items: center;
          p,
          h2 {
            width: 100%;
            text-align: center !important;
          }
        }
      }

      object {
        @include fluidSize(80, 480, $propName: "width");
        @include fluidSize(80, 480, $propName: "height");
      }
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        flex-flow: column !important;
        h2 {
          @include fluidSize($minHFontSize, $maxHFontSizeMed);
          text-align: center;
          font-weight: bold;
        }
        p {
          @include fluidSize($minPFontSize, $maxPFontSize);
          @include fluidSize(150, 1010, $propName: "width");
          text-align: right;
        }
      }
    }
  }
</style>
