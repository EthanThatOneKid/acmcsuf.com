<script lang="ts">
	import EventItem from './event-item.svelte';
	import type { AcmEvent } from '$lib/ical/parse';
	import { onMount } from 'svelte';

	export let events: AcmEvent[] = [];

	const scrollIncrementDistance = 335;
	let carouselRef: HTMLDivElement;
	let carouselButtonLeft: HTMLDivElement;
	let carouselButtonRight: HTMLDivElement;
	let isGrabbing = false;

	const scrollTheCarousel = (movementScalar: number, isSmooth: boolean = false) =>
		carouselRef.scrollBy({
			left: -movementScalar,
			behavior: isSmooth ? 'smooth' : 'auto',
		});
	var hasHorizontalScrollbar = false;
	const scrollOnMouseMove = (event: MouseEvent) => isGrabbing && scrollTheCarousel(event.movementX);
	const startGrabbing = () => (isGrabbing = true);
	const endGrabbing = () => (isGrabbing = false);
	const scrollLeft = () => scrollTheCarousel(scrollIncrementDistance, true);
	const scrollRight = () => scrollTheCarousel(-scrollIncrementDistance, true);
	const scrollHorizontally = (event: WheelEvent) => {
		event.preventDefault();
		scrollTheCarousel(-event.deltaY);
	};
	onMount(() => {
		hasHorizontalScrollbar = carouselRef.scrollWidth > carouselRef.clientWidth;
	});
</script>

<section>
	<div class="event-carousel-container">
		{#if hasHorizontalScrollbar}
			<div bind:this={carouselButtonLeft} class="carousel-button left" on:click={scrollLeft}>
				&lt;
			</div>
		{/if}
		<div
			class="event-list"
			bind:this={carouselRef}
			class:grabbing={isGrabbing}
			on:mousemove={scrollOnMouseMove}
			on:mousedown={startGrabbing}
			on:mouseup={endGrabbing}
			on:mouseleave={endGrabbing}
			on:wheel={scrollHorizontally}>
			<div class="event-item-buffer" />
			{#each events as eventInfo}
				<EventItem info={eventInfo} />
			{/each}
			<div class="event-item-buffer" />
		</div>
		{#if hasHorizontalScrollbar}
			<div bind:this={carouselButtonRight} class="carousel-button right" on:click={scrollRight}>
				&gt;
			</div>
		{/if}
	</div>
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		margin-left: 0px;
	}

	section .grabbing {
		cursor: grabbing !important;
	}

	section .event-list {
		display: flex;
		overflow-x: hidden;
		margin-left: -75px;
		padding: 0 96px;
		cursor: grab;
		-ms-overflow-style: none; /* Hide scrollbar IE and Edge */
		scrollbar-width: none; /* Hide scrollbar Firefox */
	}

	/* Hide scrollbar for Chrome, Safari and Opera */
	section .event-list::-webkit-scrollbar {
		display: none;
	}

	.event-carousel-container {
		position: relative;
		display: flex;
		width: 1168px;
	}

	.event-carousel-container::after,
	.event-carousel-container::before {
		z-index: 10;
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		width: 170px;
	}

	.event-carousel-container::after {
		right: 0;
		margin-right: -115px;
		background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, var(--acm-light) 20%);
	}

	.event-carousel-container::before {
		left: 0;
		margin-left: -115px;
		background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, var(--acm-light) 20%);
	}

	.carousel-button {
		z-index: 20;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--acm-light);
		color: var(--acm-dar);
		box-shadow: 0 3px 12px rgba(16, 19, 21, 0.2);
		width: 50px;
		height: 50px;
		border-radius: 50px;
		position: absolute;
		font-size: var(--subheading-font-size);
		top: 43%;
		transition: all 0.25s ease-in-out;
		/* Diable user select */
		-moz-user-select: none;
		-khtml-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.carousel-button:hover {
		cursor: pointer;
		background-color: var(--acm-blue);
		color: var(--acm-light);
		box-shadow: 0 3px 12px rgba(44, 145, 198, 0.5);
	}

	.carousel-button.left {
		left: 0;
	}

	.carousel-button.right {
		right: 0;
	}

	@media (max-width: 1219px) {
		.event-carousel-container {
			width: 980px;
		}
	}

	@media (max-width: 1019px) {
		.event-carousel-container {
			width: 750px;
		}
	}

	@media (max-width: 799px) {
		.event-carousel-container {
			width: 600px;
		}
	}

	@media (max-width: 649px) {
		.event-carousel-container {
			width: 435px;
		}
	}

	@media (max-width: 480px) {
		.carousel-button.left {
			left: 50px;
		}

		.carousel-button.right {
			right: 50px;
		}
	}

	@media (max-width: 360px) {
		.carousel-button.left {
			left: 70px;
		}

		.carousel-button.right {
			right: 70px;
		}
	}
</style>
