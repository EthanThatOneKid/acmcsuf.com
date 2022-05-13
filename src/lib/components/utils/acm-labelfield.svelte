<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let labels: string[] = [];
  export let selectedLabels: string[] = [];
  export let urlSearchParamKey = '';

  const dispatch = createEventDispatcher();
  let hasSelectedLabels = selectedLabels.length > 0;

  function selectLabel(event: MouseEvent) {
    event.preventDefault();

    if (selectedLabels.includes(this.innerText)) {
      selectedLabels = selectedLabels.filter((t) => t !== this.innerText);
    } else {
      selectedLabels.push(this.innerText);
    }

    this.classList.toggle('selected');
    hasSelectedLabels = selectedLabels.length > 0;
    dispatch('change', selectedLabels);
  }

  function deselectAll(event: MouseEvent) {
    event.preventDefault();
    selectedLabels = [];
    hasSelectedLabels = false;
    dispatch('change', selectedLabels);
  }

  function createLabelURL(label: string) {
    if (urlSearchParamKey === '') {
      return '';
    }
    const nextLabels = selectedLabels.includes(label)
      ? selectedLabels.filter((t) => t !== label)
      : selectedLabels.concat([label]);
    const params = new URLSearchParams([[urlSearchParamKey, nextLabels.join(',')]]);
    return '?' + params.toString();
  }
</script>

<div class="label-box">
  <div class="title" class:hidden={hasSelectedLabels}>
    <slot name="title" />
  </div>
  <a href="?" class="reset-button" class:hidden={!hasSelectedLabels} on:click={deselectAll}>
    <slot name="resetButton" />
  </a>

  <div class="label-list">
    {#each labels as label}
      <a
        href={createLabelURL(label)}
        class="label"
        class:selected={selectedLabels.includes(label)}
        on:click={selectLabel}
      >
        {label}
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  .label-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.2em;
    .title {
      font-size: 1em;
      font-weight: bold;
      margin-right: 1em;
      cursor: default;
    }
    .hidden {
      display: none;
    }
    .reset-button {
      margin-right: 1em;
      font-size: small;
      text-decoration: underline;
      cursor: pointer;
    }
    .label-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 0.2em;
      .label {
        margin-bottom: 0.2em;
        margin-right: var(--size-sm);
        padding: 0.25em 0.8em 0.25em 0.8em;
        background-color: #eeeeee;
        color: #212121;
        border-radius: var(--size-sm);
        border: 2px solid #e0e0e0;
        cursor: pointer;
        transition: 0.25s ease-in-out;
        text-decoration: none;
        &:hover {
          border-color: #b0bec5;
        }
        &.selected {
          transition: 1s ease-in-out;
          background-color: #81d4fa;
          border-color: #4fc3f7;
          &:before {
            content: '✓ ';
          }
          &:hover {
            border-color: #2196f3;
          }
        }
      }
    }
    @media screen and (max-width: 900px) {
      .title {
        display: none;
      }
      .reset-button {
        display: none;
      }
    }
  }
</style>
