<script lang="ts">
	import GitHubIcon from '$lib/components/icons/github.svelte';
	import BugsIcon from '$lib/components/icons/bugs.svelte';
</script>

<footer>
	<div class="content">
		<p class="brand-light" style="font-weight: 500">
			&copy; 2021
			<span class="headers brand-light">
				acm<span class="brand-em brand-light">CSUF</span>
			</span>
		</p>
		<div class="footer-link">
			<a href="/bugs" class="bug" target="_blank" rel="noopener norefferer">
				<BugsIcon />
			</a>
			<a href="/github" class="github" target="_blank" rel="noopener norefferer">
				<GitHubIcon />
			</a>
		</div>
	</div>
</footer>

<style lang="scss">
	@import 'static/theme.scss';
	footer {
		display: flex;
		justify-content: center;
		width: 100%;
		background-color: var(--acm-dark);
	}
	footer .content,
	footer .footer-link {
		display: flex;
		align-items: center;
	}
	footer .github {
		margin-left: 32px;
	}
	footer .content {
		justify-content: space-between;
		padding: 24px 0;
		margin: 0 24px;
		width: 1156px;
	}
	footer p {
		font-size: 18px;
	}
	footer .github :global(svg),
	footer .bug :global(svg) {
		height: 32px;
		width: 32px;
	}
	footer .github :global(path),
	footer .bug :global(path) {
		fill: var(--acm-light);
		transition: fill 0.25s ease-in-out;
	}
	footer .github:hover :global(path),
	footer .bug:hover :global(path) {
		fill: var(--acm-blue);
	}

	@media (max-width: 839px) {
		footer .github :global(svg) {
			height: 24px;
			width: 24px;
		}
		footer .bug :global(svg) {
			height: 24px;
			width: 24px;
		}
		footer .content {
			padding: 12px 0;
		}
	}
</style>
