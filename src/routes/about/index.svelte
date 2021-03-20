<script lang="ts">
  import Headline from "@/components/sections/headline.svelte";
  import WhatAreYouWaitingFor from "@/components/sections/what-are-you-waiting-for.svelte";
  import CommonHero from "@/components/sections/common-hero.svelte";
  import { officers } from "../../lib/officers";
  import OfficerProfile from "@/components/sections/officer-profile.svelte";
  let currentSchoolYear = "2020-2021";
</script>

<CommonHero>
  <h1 slot="title">about</h1>
  <h2 slot="headline">
    what is acm<span class="brand-blue">CSUF</span>
  </h2>
  <p slot="text">
    <span class="brand-em">acm<span class="brand-blue">CSUF</span></span>
    is a student-ran chapter of the association for computing machinery. we focus
    on introducing and getting students involved in tech, as well as educating students
    about the field through workshops, presentations, livestreams, and more. our
    events are open to any and everyone, so be sure to come by!
  </p>
</CommonHero>

<section class="about-screen-who-are-we">
  <h2 class="brand-em">
    who are <span class="brand-blue">we</span>
  </h2>
  <div class="school-year-input-container">
    <select name="school-year" bind:value="{currentSchoolYear}">
      {#each Object.keys(officers) as schoolYear (schoolYear)}
        <option value="{schoolYear}">{schoolYear}</option>
      {/each}
    </select>
  </div>
  <div class="officers-2020-2021-container">
    {#each officers[currentSchoolYear] as { name, title, picture, url }, i (name)}
      <OfficerProfile
        name="{name}"
        title="{title}"
        picture="{picture}"
        key="{picture}"
      />
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
    margin-top: 200px;
    h2 {
      @include fluidSize($minHFontSize, $maxHFontSizeMed);
      text-align: center;
      font-weight: bold;
    }
    .school-year-input-container {
      min-width: 100px;
      text-align: center;

      select {
        background-color: $acmDark;
        padding: 1em;
        color: $acmLight;
        font-family: "Poppins", sans-serif;
        font-weight: bold;
        border-radius: 25px;

        option {
          background-color: $acmDark;
          color: $acmLight;
          border-radius: 25px;
        }
      }
    }
    .officers-2020-2021-container {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      // .officer-container {
      //   display: flex;
      //   flex-direction: column;
      //   justify-content: center;
      //   align-items: center;
      //   padding: 64px;
      //   .officer-image {
      //     width: 200px;
      //     height: 200px;
      //   }
      //   h3 {
      //     font-size: 24px;
      //     color: $acmDark;

      //     a {
      //       color: $acmDark;
      //       text-decoration: none;
      //     }
      //   }
      //   span {
      //     font-size: 18px;
      //     color: grey;
      //   }
      // }
    }
  }
</style>
