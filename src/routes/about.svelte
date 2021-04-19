<script lang="ts">
  import CommonHero from "@/components/sections/common-hero.svelte";
  import OfficerProfileList from "@/components/sections/officer-profile-list.svelte";
  import Spacing from "@/components/sections/spacing.svelte";
  import CallToActionSection from "@/components/sections/call-to-action-section.svelte";
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
<Spacing amount="200px" />
<OfficerProfileList />
<Spacing amount="175px" />
<CallToActionSection>
  <h2 slot="headline">how can i get involved?</h2>
  <p slot="text">
    We current don’t have openings for board positions, but follow us on social
    media to get notified when we do! Until then, we invite you to become a part
    of our chapter to start off your tech journey on the right foot.
  </p>
</CallToActionSection>
<Spacing amount="175px" />
