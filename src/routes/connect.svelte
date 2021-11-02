<script lang="ts">
	import CommonHero from '$lib/components/sections/common-hero.svelte';
	import Spacing from '$lib/components/sections/spacing.svelte';
	import SocialMediaLinks from '$lib/components/connect/social-media-links.svelte';
	import GetInTouchForm from '$lib/components/connect/get-in-touch-form.svelte';

	const googleFormId = '1FAIpQLSfJanOAaL2mdjpf193tFeCClBzpW_COEO_crAE8hqsJCB_Rwg';
</script>

<Spacing --mobile-space="100px" --medium-space="175px" --desktop-space="200px" />

<CommonHero>
	<h2 slot="headline" class="size-l">Connect with us!</h2>
	<p slot="text" class="size-xs">
		The best way to stay up to date with us is by following all of our social platforms, and by
		joining our Discord server. We post announcements, exclusive content, and more, so there’s never
		a chance to miss out on what’s going on.
	</p>
</CommonHero>

<Spacing --medium-space="64px" />

<SocialMediaLinks />

<Spacing --mobile-space="100px" --medium-space="175px" --desktop-space="200px" />

<GetInTouchForm {googleFormId} />

<Spacing --mobile-space="40px" --medium-space="95px" --desktop-space="120px" />

<style lang="scss">
	@import 'static/theme.scss';
</style>
