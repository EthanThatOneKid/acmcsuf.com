<script lang="ts">
	import { acmAlgo, acmCreate, acmDev } from '$lib/constants/acm-paths';
	import CommonHero from '$lib/components/sections/common-hero.svelte';
	import PathSection from '$lib/components/paths/path-section.svelte';
	import Spacing from '$lib/components/sections/spacing.svelte';
</script>

<Spacing --mobile-space="100px" --medium-space="175px" --desktop-space="200px" />

<CommonHero>
	<h2 slot="headline" class="size-l">What are paths?</h2>
	<p slot="text" class="size-xs">
		Paths are committees that specialize in specific fields in the tech industry. We’ve designed
		paths to be gateways for students to explore new fields, develop new interests, and enhance
		skills that’ll benefit in the industry.
	</p>
</CommonHero>

<Spacing --mobile-space="100px" --medium-space="175px" --desktop-space="200px" />

<PathSection info={acmAlgo} textAlign="right">
	<p slot="content" class="size-xs">
		This path is dedicated to building the programming proficiency of students.
		<span class="brand-purple brand-em">Algo</span> focuses on mastering data structures and algorithms,
		enhancing problem solving abilities, and exploration of competitive programming.
	</p>
</PathSection>

<Spacing --medium-space="64px" />

<PathSection info={acmCreate} textAlign="left">
	<p slot="content" class="size-xs">
		This path is dedicated to emphasizing the importance of product design and product management in
		the tech industry. <span class="brand-pink brand-em">Create</span> focuses on educating students
		about design principles, design tools, and the intricacies of conceptualization, development, and
		management of a product.
	</p>
</PathSection>

<Spacing --medium-space="64px" />

<PathSection info={acmDev} textAlign="right">
	<p slot="content" class="size-xs">
		This path is dedicated to giving students the opportunity to explore tech via hands-on projects
		and activities. <span class="brand-em brand-bluer">Dev</span> focuses on introducing students to
		software development, and the various tech stacks used in the industry.
	</p>
</PathSection>

<Spacing --mobile-space="40px" --medium-space="95px" --desktop-space="120px" />

<style lang="scss">
	@import 'static/theme.scss';
</style>
