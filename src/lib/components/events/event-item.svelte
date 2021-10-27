<script lang="ts">
	import { onMount } from 'svelte';
	import type { AcmEvent } from '$lib/ical/parse';
	import AcmButton from '$lib/components/utils/acm-button.svelte';

	export let info: AcmEvent;

	let isActive: boolean = false;
	let isRecurring: boolean = info.recurring;
	let isSuccessfullyCopied: boolean = false;
	let anchor: HTMLDivElement;

	const copyEventLink = (slug: string) => {
		const url = [location.origin, location.pathname, '#', slug].join('');
		// Copying text to the clipboard: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
		navigator.clipboard.writeText(url).then(() => {
			isSuccessfullyCopied = true;
			setTimeout(() => (isSuccessfullyCopied = false), 2e3);
		});
	};

	onMount(() => {
		isActive = location.hash === `#${info.slug}`;
		if (isActive) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'center',
			});
		}
	});
</script>

<div class="event-box">
	<div class="anchor" id={info.slug} class:active={isActive} bind:this={anchor} />
	<div class="event-card">
		<p class="event-date">
			<span class="mid">
				{info.month}
				{info.day}
			</span>
			{#if isRecurring}
				<p class="event-recurring">RECURRING</p>
			{/if}
		</p>
		<h3
			class="headers"
			class:copied={isSuccessfullyCopied}
			on:click={() => copyEventLink(info.slug)}>
			{info.summary}
		</h3>
		<div>
			<p class="event-time">{info.time} PT</p>
			<p class="event-location">
				{info.location === 'Discord' || info.location === 'Zoom'
					? `Hosted on ${info.location}`
					: info.location}
			</p>
			<AcmButton link={info.meetingLink} text="Click to join!" />
		</div>
	</div>
</div>

<style lang="scss">
	@import 'static/theme.scss';

	.event-box {
		display: flex;
		position: relative;
	}

	.event-box > .anchor {
		visibility: hidden;
		position: absolute;
		top: -200px;
	}

	.event-box > .anchor:target + .event-card,
	.event-box > .anchor.active + .event-card {
		border: 2px solid var(--acm-blue);
	}

	.event-card {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 200px;
		height: 300px;
		margin: 32px 0 32px 64px;
		padding: 32px;
		box-shadow: 0 6px 24px rgba(44, 145, 198, 0.5);
		border-radius: 30px;
	}

	.event-recurring {
		font-weight: 800;
		color: var(--acm-blue);
		font-size: 16px;
	}

	.event-card h3 {
		position: relative;
		width: 186px;
		text-align: center;
		user-select: none;
		color: var(--acm-dark);
		transition: all 0.25s ease-in-out;
	}

	.event-card h3:hover {
		color: var(--acm-blue);
		cursor: pointer;
	}

	.event-card .copied::before {
		content: 'Copied link!';
		position: absolute;
		width: 100%;
		border-radius: 10px;
		background-color: var(--acm-blue);
		color: var(--acm-light);
		font-weight: 500;
		padding: 0.25rem;
		left: 50%;
		transform: translate(-50%, -100%);
		opacity: 0.8;
	}

	.event-card p {
		text-align: center;
		user-select: none;
	}
</style>
