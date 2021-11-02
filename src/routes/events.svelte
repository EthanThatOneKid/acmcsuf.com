<script lang="ts">
	import { onMount } from 'svelte';
	import type { AcmEvent } from '$lib/parse-ical-data';
	import CommonHero from '$lib/components/sections/common-hero.svelte';
	import Spacing from '$lib/components/sections/spacing.svelte';
	import EventCarousel from '$lib/components/events/event-carousel.svelte';
	import AcmEmpty from '$lib/components/utils/acm-empty.svelte';

	let events: AcmEvent[] = [];
	let isLoading = true;

	onMount(() => {
		// Lazily load the iCal data for the event carousel.
		fetch('../events.json')
			.then((response) => response.json())
			.then((icalData) => {
				events = icalData as AcmEvent[];
				isLoading = false;
			});
	});
</script>

<Spacing --mobile-space="100px" --medium-space="175px" --desktop-space="200px" />

<CommonHero>
	<h2 slot="headline" class="size-l">Curated events for growth and success</h2>
	<p slot="text" class="size-xs">
		Our student chapter hosts a multitude of events throughout each school semester, consisting of
		workshops, info sessions, community building events, and much more!
		<br /><br />
		<span class="brand-med"
			>Events are open to anyone interested, regardless of major or background experience.</span
		>
	</p>
</CommonHero>

<Spacing --mobile-space="100px" --medium-space="125px" --desktop-space="125px" />

<h2 class="size-l headers">This week's events 📅</h2>

<Spacing --medium-space="16px" />

{#if events.length > 0}
	<EventCarousel {events} />
{:else}
	<AcmEmpty>
		<p slot="content">
			{#if isLoading}
				Loading…
			{:else}
				There are no events scheduled!
			{/if}
		</p>
	</AcmEmpty>
{/if}

<Spacing --mobile-space="8px" --medium-space="63px" --desktop-space="88px" />

<style lang="scss">
	@import 'static/theme.scss';

	h2 {
		display: flex;
		justify-content: center;
	}

	p {
		text-align: center;
	}
</style>
