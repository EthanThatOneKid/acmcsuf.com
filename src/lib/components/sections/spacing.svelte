<div />

<style>
	div {
		--med: 100px;
		--min: var(--med, 100px);
		--max: var(--med, 100px);
		height: var(--min);
	}

	@media screen and (min-width: 768px) {
		div {
			height: var(--med);
		}
	}

	@media screen and (min-width: 1440px) {
		div {
			height: var(--max);
		}
	}
</style>
