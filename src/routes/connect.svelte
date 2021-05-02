<script lang="ts">
  import CommonHero from "@/components/sections/common-hero.svelte";
  import Spacing from "@/components/sections/spacing.svelte";
  import SocialMediaLinks from "@/components/sections/social-media-links.svelte";
  import GetInTouchForm from "@/components/sections/get-in-touch-form.svelte";
  import CallToActionSection from "@/components/sections/call-to-action-section.svelte";

  const googleFormId =
    "1FAIpQLSfJanOAaL2mdjpf193tFeCClBzpW_COEO_crAE8hqsJCB_Rwg";
</script>

<CommonHero src="../assets/png/acm-csuf-badge.png" alt="acm-CSUF-Logo">
  <h1 slot="title">connect</h1>
  <h2 slot="headline">Follow us!</h2>
  <p slot="text">
    The best way to keep up with what's going on in the world of
    <span class="brand-bold">acm<span class="brand-blue">CSUF</span></span>
    is by following us on our social media, and by joining our Discord server! The
    accounts listed below are our only public profiles.
  </p>
</CommonHero>

<Spacing />

<SocialMediaLinks />

<Spacing />

<GetInTouchForm googleFormId="{googleFormId}" />

<Spacing />

<CallToActionSection>
  <h2 slot="headline">So what are you waiting for?</h2>
  <p slot="text">
    We are excited to take your messages and ideas into consideration! <span
      class="brand-bold">acm<span class="brand-blue">CSUF</span></span
    >
    is here to support you, as
    <span class="brand-bold">the largest tech community </span> on campus.
  </p>
</CallToActionSection>

<Spacing amount="175px" />

<style>
  .brand-bold {
    font-weight: bold;
  }
</style>
