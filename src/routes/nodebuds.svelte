<script lang="ts">
  import HowCanIGetInvoved from "@/components/sections/how-can-i-get-involved.svelte";
  import WhyJoinNodebuds from "@/components/nodebuds/why-join-nodebuds.svelte";
  import Spacing from "@/components/sections/spacing.svelte";
  import CommonHero from "@/components/sections/common-hero.svelte";
  import NodeBudsTestimonial from "@/components/nodebuds/nodebuds-testimonial.svelte";
</script>

<CommonHero src="../assets/png/node-buds-badge.png" alt="CSUF NodeBuds Logo">
  <h1 slot="title">node<span class="brand-nodebuds">Buds</span></h1>
  <h2 slot="headline">what is node<span class="brand-nodebuds">Buds</span>?</h2>
  <p slot="text">
    <span class="brand-bold">node<span class="brand-nodebuds">Buds</span></span>
    is a mentorship program that aims to help underclassmen adjust to university
    life, and to prepate them for the tech industry. We achieve this by having upper
    an underclassman form strong connection with each other which allows them to
    exchange advice, skills, and more, all in order to start student off successfully.
  </p>
</CommonHero>
<Spacing />
<WhyJoinNodebuds />
<Spacing />
<NodeBudsTestimonial
  src="../assets/png/node-buds-testimonial-illustration.png"
  alt="Mentory Samuel Sandoval and trainee Johnson Tong"
>
  <span slot="semester">fall <span class="brand-nodebuds">2020</span></span>
  <p slot="content">
    <span class="brand-bold">node<span class="brand-nodebuds">Buds</span></span>
    is a great way to get ahold of how you can move forward in your computer science
    journey! If you feel lost, or don’t have much idea of what to do,
    <span class="brand-bold">node<span class="brand-nodebuds">Buds</span></span>
    is a great way to learn and gain insight from a mentor who has more experience,
    and is further along than you are.
    <br />
    <span class="brand-bold">By Johnson Tong</span>
  </p>
</NodeBudsTestimonial>
<Spacing />
<HowCanIGetInvoved />

<style>
  .brand-nodebuds {
    color: var(--acm-red);
  }
  .brand-bold {
    font-weight: bold;
  }
</style>
