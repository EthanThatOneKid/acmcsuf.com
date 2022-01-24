<script lang="ts">
  export let defaultValue = '';
  export let options: string[] = [];

  let currentValue: string = defaultValue;
  let active = false;

  const toggleDropdown = () => {
    active = !active;
  };

  const handleOption = (term: string) => {
    currentValue = term;
    defaultValue = currentValue;
    active = false;
  };
</script>

<div class="term" name="school-year">
  <div class="option-box" class:active>
    <div class="selected" on:click={toggleDropdown}>{currentValue}</div>
    <div class="option">
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
      font-size: 18px;
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
    border-radius: 8px;
    transition: 0.25s ease-in-out;

    &:hover {
      background-color: var(--acm-blue);
    }
  }

  .active > .selected {
    border-radius: 8px 8px 0 0;
  }

  .option {
    cursor: pointer;
    visibility: hidden;
    transition: 0.25s ease-in-out;

    .option-choice {
      cursor: pointer;

      &:hover {
        color: var(--acm-light);
      }
    }
  }

  .active > .option {
    visibility: visible;
    background-color: var(--acm-dark);
    padding: 8px 24px;
    margin-top: 0.2rem;
    border-radius: 0 0 8px 8px;
    transition: 0.25s ease-in-out;

    .option-choice {
      transition: 0.25s ease-in-out;

      &:hover {
        color: var(--acm-blue);
      }
    }
  }
</style>
