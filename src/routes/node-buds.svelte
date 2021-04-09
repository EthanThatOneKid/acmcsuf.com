<script lang="ts">
  // import ComingSoon from "@/components/sections/coming-soon.svelte";
  import Headline from "@/components/sections/headline.svelte";
  import WhyJoinNodeBuds from "@/components/sections/why-join-nodebuds.svelte";
  // import WhatAreYouWaitingFor from "@/components/sections/what-are-you-waiting-for.svelte";
  import HowCanIGetInvoved from "@/components/sections/how-can-i-get-involved.svelte";
  import WhyJoinNodebuds from "@/components/sections/why-join-nodebuds.svelte";
</script>

<!-- <ComingSoon title="node buds" src="../assets/badges/PNG/node-buds-badge.png" /> -->
<section class="nodebuds-screen-hero">
  <div>
    <Headline src="../assets/badges/PNG/node-buds-badge.png"
      >node<span class="brand-red">Buds</span>
    </Headline>
    <div class="about-description-container">
      <h2 class="brand-em">what is node<span class="brand-red">Buds</span>?</h2>
      <p>
        <span class="brand-em">node<span class="brand-red">Buds</span></span> is
        a mentorship program that aims to help underclassmen adjust to university
        life, and to prepate them for the tech industry. We achieve this by having
        upper an underclassman form strong connection with each other which allows
        them to exchange advice, skills, and more, all in order to start student
        off successfully.
      </p>
    </div>
  </div>
</section>

<WhyJoinNodebuds />
<HowCanIGetInvoved />

<style lang="scss">
  @import "../style/theme.scss";
  .nodebuds-screen-hero {
    padding-top: 100px;
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      h2 {
        @include fluidSize($minHFontSize, $maxHFontSizeMed);
        text-align: center;
        font-weight: bold;
        padding: 1em 0;
      }
      p {
        @include fluidSize($minPFontSize, $maxPFontSize);
        @include fluidSize(220, 1500, $propName: "width");
        text-align: center;
      }
    }
  }
</style>
