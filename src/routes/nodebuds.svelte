<script lang="ts">
  import Spacing from "@/components/sections/spacing.svelte";
  import NodeBudsTestimonial from "@/components/nodebuds/nodebuds-testimonial.svelte";
  import OfficerProfileList from "@/components/about/officer-profile-list.svelte";
  import { OFFICERS } from "../lib/officers";

  const allNodeBuddies = OFFICERS.filter(({ positions }) =>
    Object.values(positions).some((position) =>
      position.toUpperCase().includes("NODEBUDS")
    )
  );
</script>

<Spacing minAmount="100px" amount="175px" maxAmount="200px" />

<div class="container">
  <section>
    <div>
      <h2 class="headers size-l">Personalized mentorship</h2>
      <p class="size-s">
        <span class="headers">
          Node<span class="brand-em brand-red">Buds</span>
        </span>
        is our exclusive program where underclassmen get paired with mentors, called
        <span class="mid">Buddies</span>, who will assist them with adjusting to
        university life while simultaneously preparing them for their personal
        journeys in tech.
        <br /><br />
        Our program exposes underclassmen to various opportunities that encourage
        connection, skill building, as well as both personal and technical development.
      </p>
    </div>
    <img src="assets/badges/nodebuds.svg" alt="nodeBuds badge" />
  </section>
</div>

<Spacing minAmount="100px" amount="175px" maxAmount="200px" />

<NodeBudsTestimonial>
  <!-- <p slot="content1">
    "Great way to get ahold of how you can move forward in your computer science
    journey!"
    <Spacing amount="8px" />
    <span class="mid">Johnson Tong, Fall 2020</span>
  </p> -->

  <p slot="content2">
    "Great way to get a hold of how you can move forward in your computer
    science journey!"
    <Spacing amount="8px" />
    <span class="mid">Johnson Tong, Fall 2020</span>
  </p>

  <!-- <p slot="content3">
    "Great way to get ahold of how you can move forward in your computer science
    journey!"
    <Spacing amount="8px" />
    <span class="mid"> Johnson Tong, Fall 2020 </span>
  </p> -->
</NodeBudsTestimonial>

<Spacing minAmount="100px" amount="175px" maxAmount="200px" />

<div class="container">
  <h2>Buddies</h2>
</div>

<Spacing amount="16px" />

<OfficerProfileList
  officers="{allNodeBuddies}"
  placeholderPicture="nodebuds-placeholder.svg"
/>

<Spacing minAmount="40px" amount="95px" maxAmount="120px" />

<style lang="scss">
  @import "static/theme.scss";

  .container {
    display: flex;
    justify-content: center;
    margin: 0 32px;
  }

  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1064px;
  }

  section img {
    margin-right: -32px;
    width: 350px;
    filter: drop-shadow(0 10px 40px rgba(212, 17, 83, 0.5));
    -webkit-filter: drop-shadow(0 10px 40px rgba(212, 17, 83, 0.5));
  }

  section div {
    max-width: 520px;
  }

  section h2 {
    padding-bottom: 16px;
  }

  @media (max-width: 839px) {
    section {
      flex-direction: column-reverse;
      text-align: center;
    }

    section img {
      margin: 0;
      width: 175px;
      padding-bottom: 32px;
    }

    .mid {
      margin-bottom: 32px;
    }
  }
</style>
