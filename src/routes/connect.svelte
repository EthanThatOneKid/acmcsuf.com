<script lang="ts">
  import CommonHero from '$lib/components/sections/common-hero.svelte';
  import Spacing from '$lib/components/sections/spacing.svelte';
  import SocialMediaLinks from '$lib/components/connect/social-media-links.svelte';
  import GetInTouchForm from '$lib/components/connect/get-in-touch-form.svelte';

  const googleFormId = '1FAIpQLSfJanOAaL2mdjpf193tFeCClBzpW_COEO_crAE8hqsJCB_Rwg';
</script>

<Spacing --min="100px" --med="175px" --max="200px" />

<CommonHero>
  <h2 slot="headline" class="size-l">Connect with us!</h2>
  <p slot="text" class="size-xs">
    The best way to stay up to date with us is by following all of our social platforms, and by
    joining our Discord server. We post announcements, exclusive content, and more, so there’s never
    a chance to miss out on what’s going on.
  </p>
</CommonHero>

<Spacing --med="64px" />

<SocialMediaLinks />

<Spacing --min="100px" --med="175px" --max="200px" />

<GetInTouchForm {googleFormId} />

<Spacing --min="40px" --med="95px" --max="120px" />

<style lang="scss">
  @import 'static/theme.scss';
</style>
