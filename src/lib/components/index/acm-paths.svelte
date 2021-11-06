<script lang="ts">
	import { acmPaths } from '$lib/constants/acm-paths';
</script>

<section>
	<div class="paths-intro">
		<h2 class="headers size-l">Get involved with our paths!</h2>
		<p class="size-xs">
			Paths were designed to empower students who want to specialize in something specific within
			the industry. By joining any of our paths, students will be given access to exclusive
			workshops and events that’ll build, strengthen, and improve skills.
		</p>
	</div>

	<div class="paths-list">
		{#each acmPaths as { title, slug, picture, color } (slug)}
			<a class="path-item" target="_self" href={`/paths#${slug}`}>
				<img src={picture} alt={`${slug}-logo`} />
				<p class="size-m headers">
					acm<span class="brand-em" style={`--brand-color=${color}`}>
						{title}
					</span>
				</p>
			</a>
		{/each}
	</div>
</section>

<style lang="scss">
	@import 'static/theme.scss';

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 24px;
	}

	.paths-intro {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		max-width: 1050px;
	}

	.paths-intro p {
		margin-top: 16px;
	}

	.paths-list {
		display: flex;
		justify-content: space-between;
		margin-top: 64px;
	}

	.path-item {
		display: flex;
		flex-direction: column;
		margin: 0 50px 0;
		align-items: center;
		text-decoration: none;
	}

	.path-item img {
		max-width: 200px;
		transform: scale(1);
		transition: 0.25s ease-in-out;
	}

	.path-item img:hover {
		transform: scale(1.15);
	}

	.path-item p span {
		color: var(--brand-color);
	}

	@media (max-width: 839px) {
		.paths-list {
			flex-direction: column;
			height: 700px;
		}

		.path-item img {
			max-width: 150px;
		}
	}
</style>
