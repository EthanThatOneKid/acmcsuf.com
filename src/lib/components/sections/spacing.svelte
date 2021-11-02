<div />

<style>
	div {
		--medium-space: 100px;
		--mobile-space: var(--medium-space, 100px);
		--desktop-space: var(--medium-space, 100px);
		height: var(--mobile-space);
	}

	@media screen and (min-width: 768px) {
		div {
			height: var(--medium-space);
		}
	}

	@media screen and (min-width: 1440px) {
		div {
			height: var(--desktop-space);
		}
	}
</style>
