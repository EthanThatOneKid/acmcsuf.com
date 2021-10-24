<script lang="ts">
	export let defaultValue: string = '';
	export let options: string[] = [];

	let currentValue: string = defaultValue;
	let active: boolean = false;

	const toggleDropdown = () => {
		active = !active;
	};

	const handleOption = (term) => {
		currentValue = term;
		defaultValue = currentValue;
		active = false;
	};
</script>

<div class="term" name="school-year">
	<div class="option-box">
		<div class="selected" on:click={toggleDropdown}>{currentValue}</div>
		<div class="option" class:active>
			{#each options as optionValue (optionValue)}
				<div class="option-choice" on:click={() => handleOption(optionValue)}>
					{optionValue}
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.term {
		font-weight: 600;
		.option-box {
			flex-direction: column;
			display: flex;
			justify-content: center;
		}
	}

	.option-choice,
	.selected {
		color: var(--acm-light);
	}
	.selected {
		background-color: var(--acm-dark);
		padding: 8px 24px;
		cursor: pointer;
		border-radius: 6px 6px 0px 0px;
		&:hover {
			color: var(--acm-blue);
		}
	}

	.option {
		cursor: pointer;
		visibility: hidden;
		margin-bottom: 0.5rem;
		transition: all 300ms;
		.option-choice {
			cursor: pointer;
			&:hover {
				color: var(--acm-light);
			}
		}
	}

	.option.active {
		visibility: visible;
		background-color: var(--acm-dark);
		padding: 8px 24px;
		margin-top: 0.2rem;
		border-radius: 0 0 6px 6px;
		transition: all 200ms;
		.option-choice:hover {
			color: var(--acm-blue);
		}
	}
</style>
