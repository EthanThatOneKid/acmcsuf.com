<script lang="ts">
	export let defaultValue: string | HTMLInputElement = '';
	export let options: string[] = [];

	let option: HTMLDivElement;
	let dropTitle: HTMLDivElement;

	const setDrop = () => {
		option.classList.toggle('active');
	};

	const handleOption = (term) => {
		dropTitle.innerHTML = term;
		option.classList.remove('active');
		defaultValue = term;
	};
</script>

<div class="term" name="school-year">
	<div class="option-box">
		<div class="selected" bind:this={dropTitle} on:click={setDrop}>{defaultValue}</div>
		<div class="option active" bind:this={option}>
			{#each options as optionValue (optionValue)}
				<div>
					<input
						value={optionValue}
						on:click={() => handleOption(optionValue)}
						type="radio"
						class="radio"
						id={optionValue} />
					<label for={optionValue}> {optionValue} </label>
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

	label,
	.selected {
		color: white;
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
		label {
			cursor: pointer;
			&:hover {
				color: transparent;
			}
		}
	}
	.radio {
		display: none;
	}

	.option.active {
		visibility: visible;
		background-color: var(--acm-dark);
		padding: 8px 24px;
		margin-top: 0.2rem;
		border-radius: 0 0 6px 6px;
		transition: all 200ms;
		label:hover {
			color: var(--acm-blue);
		}
	}
</style>
