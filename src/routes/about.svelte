<script lang="ts">
  import CommonHero from "@/components/sections/common-hero.svelte";
  import OfficerProfileList from "@/components/sections/officer-profile-list.svelte";
  import Spacing from "@/components/sections/spacing.svelte";
  import CallToActionSection from "@/components/sections/call-to-action-section.svelte";
</script>

<CommonHero>
  <h1 slot="title">About</h1>
  <h2 slot="headline">
    What is <span class="brand-em">
      acm<span class="brand-blue">CSUF</span>
    </span>
  </h2>
  <p slot="text">
    <span class="brand-em">acm<span class="brand-blue">CSUF</span></span>
    is a student-ran chapter of the Association for Computing Machinery. We focus
    on getting students involved in the tech community as well as educating students
    about the field through workshops, presentations, livestreams, and more. Our
    events are open to any and everyone, so be sure to drop by!
  </p>
</CommonHero>

<Spacing amount="200px" />

<OfficerProfileList />

<Spacing amount="175px" />

<CallToActionSection>
  <h2 slot="headline">How can I get involved?</h2>
  <p slot="text">
    We current don’t have openings for board positions, but follow us on social
    media to get notified when we do! Until then, we invite you to become a part
    of our chapter to start off your tech journey on the right foot.
  </p>
</CallToActionSection>

<Spacing amount="175px" />
