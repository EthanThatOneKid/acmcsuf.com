<script lang="ts">
  import WhatAreYouWaitingFor from "@/components/sections/what-are-you-waiting-for.svelte";
  import CommonHero from "@/components/sections/common-hero.svelte";
  import OfficerProfileList from "@/components/sections/officer-profile-list.svelte";
  import Spacing from "@/components/sections/spacing.svelte";
</script>

<Spacing amount="200px" />
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
<Spacing amount="200px" />
<OfficerProfileList />
<WhatAreYouWaitingFor />
