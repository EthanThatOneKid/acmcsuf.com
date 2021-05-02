<script>
  import Hero from "@/components/index/hero.svelte";
  import WhyJoin from "@/components/index/why-join.svelte";
  import AcmPaths from "@/components/index/acm-paths.svelte";
  import Spacing from "@/components/sections/spacing.svelte";
  import CallToActionSection from "@/components/sections/call-to-action-section.svelte";
</script>

<Hero />

<Spacing amount="200px" />

<WhyJoin />

<Spacing amount="200px" />

<AcmPaths />

<Spacing amount="200px" />

<CallToActionSection>
  <h2 slot="headline">So what are you waiting for?</h2>
  <p slot="text">
    We invite you to become a part of our chapter consisting of
    <b>350<span class="brand-blue">+</span> members</b>, and rising! All of our
    coding workshops, info sessions, and community events were designed to start
    off your tech journey on the right foot.
  </p>
</CallToActionSection>

<Spacing amount="200px" />
