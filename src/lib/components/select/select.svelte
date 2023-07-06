<script lang="ts">
  import { slide } from 'svelte/transition';
  export let defaultValue = '';
  export let options: string[] = [];

  let currentValue: string = defaultValue;
  let active = false;

  function toggleDropdown() {
    active = !active;
  }

  function handleOption(term: string) {
    currentValue = term;
    defaultValue = currentValue;
    active = false;
  }
</script>

<div class="term">
  <div class="option-box" class:active>
    <div class="selected" on:click|preventDefault={toggleDropdown} on:keypress={toggleDropdown}>
      {currentValue}
    </div>

    {#if active}
      <div class="option" transition:slide|global>
        {#each options as optionValue (optionValue)}
          <div
            class="option-choice"
            on:click|preventDefault={() => handleOption(optionValue)}
            on:keypress={() => handleOption(optionValue)}
            class:pre-selected={currentValue == optionValue}
          >
            {optionValue}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .pre-selected {
    opacity: 0.6;
  }

  .term {
    position: relative;
    z-index: 8;
    font-weight: 600;
    .option-box {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      flex-direction: column;
      display: flex;
      justify-content: center;
      font-size: var(--size-sm);
      user-select: none;
      text-align: center;
      width: 9em;

      .option-choice,
      .selected {
        color: var(--perma-light);
      }

      .selected {
        background-color: var(--button-bg);
        padding: 8px 24px;
        cursor: pointer;
        border-radius: 8px;
        transition: 0.25s ease-in-out;

        &:hover {
          background-color: var(--button-hover);
        }
      }
      .option {
        cursor: pointer;
        transition: 0.25s ease-in-out;

        .option-choice {
          text-align: center;
          cursor: pointer;
          transition: 0.25s ease-in-out;

          &:hover:not(.pre-selected) {
            color: var(--acm-blue);
          }
        }
      }
    }

    .active {
      & > .selected {
        border-radius: 8px 8px 0 0;
      }

      & > .option {
        background-color: var(--button-bg);
        padding: 8px 24px;
        margin-top: 0.2rem;
        border-radius: 0 0 8px 8px;
        transition: 0.25s ease-in-out;
      }
    }
  }
</style>
