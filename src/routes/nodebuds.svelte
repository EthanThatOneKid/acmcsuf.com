<script lang="ts">
	import Spacing from '$lib/components/sections/spacing.svelte';
	// import NodeBudsTestimonial from "@/components/nodebuds/nodebuds-testimonial.svelte";
	import OfficerProfileList from '$lib/components/about/officer-profile-list.svelte';
	import { TERMS } from '$lib/constants/officers';
	import type { Officer } from '$lib/constants/officers';
	import { termIndex } from '$lib/stores/term-index';

	const filterNodeBuddies = (officer: Officer) => {
		const position = officer.positions[TERMS[$termIndex]];
		if (position === undefined) return false;
		const isNodeBuddy = position.toUpperCase().includes('NODEBUDS');
		return isNodeBuddy;
	};
</script>

<Spacing minAmount="100px" amount="175px" maxAmount="200px" />

<div class="container">
	<section>
		<div>
			<h2 class="headers size-l">Personalized mentorship</h2>
			<p class="size-xs">
				<span class="headers">
					node<span class="brand-em brand-red">Buds</span>
				</span>
				is our exclusive program in partnership with
				<a href="/acm-w" class="w-text" target="_blank" rel="noopener noreferrer">
					<span class="headers">ACM </span>W</a
				>
				that exposes students to various opportunities that encourage connection, skill building, as
				well as both personal and technical development.
				<br /><br />
				Everone under this program will get paired with student-mentors, called
				<span class="brand-med">Buddies</span>, who will be there to help students prepare for their
				successful journeys through the tech industry.
			</p>
		</div>
		<img src="assets/badges/nodebuds.svg" alt="nodeBuds badge" />
	</section>
</div>

<!-- <Spacing minAmount="100px" amount="175px" maxAmount="200px" />

<NodeBudsTestimonial>
  <p slot="content1">
    "Great way to get ahold of how you can move forward in your computer science
    journey!"
    <Spacing amount="8px" />
    <span class="mid">Johnson Tong, Fall 2020</span>
  </p>

  <p slot="content2">
    "Great way to get a hold of how you can move forward in your computer
    science journey!"
    <Spacing amount="8px" />
    <span class="mid">Johnson Tong, Fall 2020</span>
  </p>

  <p slot="content3">
    "Great way to get ahold of how you can move forward in your computer science
    journey!"
    <Spacing amount="8px" />
    <span class="mid"> Johnson Tong, Fall 2020 </span>
  </p>
</NodeBudsTestimonial> -->

<Spacing minAmount="100px" amount="175px" maxAmount="200px" />

<div class="container">
	<h2 class="headers size-l">Buddies</h2>
</div>

<Spacing amount="16px" />

<OfficerProfileList filter={filterNodeBuddies} />

<Spacing minAmount="40px" amount="95px" maxAmount="120px" />

<style lang="scss">
	@import 'static/theme.scss';

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
		max-width: 522px;
	}

	section h2 {
		padding-bottom: 16px;
	}

	.w-text {
		text-decoration: none;
		font-weight: 700;
		color: var(--acm-dark);
		transition: color 0.25s ease-in-out;
	}

	.w-text:hover {
		color: var(--acm-sky);
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
