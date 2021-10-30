<script>
	import { dev } from '$app/env';
	export let status = 404;
	export let error = new Error('Page Not Found');
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>{status} {error.message}</h1>
<div class="image-container">
	<img src="/assets/png/acm-shark.png" alt="ACM mascot with 404 error" />
</div>
{#if dev && error.stack}
	<pre><code>{error.stack}</code></pre>
{/if}

<style>
	h1 {
		font-size: 2.8em;
		font-weight: 700;
		padding-top: 1.5em;
		margin: 0 auto;
	}

	.image-container {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 4em 0 4em 0;
	}

	img {
		width: 200px;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}

		img {
			width: 400px;
		}
	}

	@media (min-width: 770px) {
		img {
			width: 600px;
		}
	}
</style>
