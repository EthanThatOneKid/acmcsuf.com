<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let tags: string[] = [];
  export let selectedTags: string[] = [];
  export let label = '';
  export let resetButton = '';
  export let urlSearchParamKey = '';

  const dispatch = createEventDispatcher();
  let hasSelectedTags = selectedTags.length > 0;

  function selectTag(event: MouseEvent) {
    event.preventDefault();

    if (selectedTags.includes(this.innerText)) {
      selectedTags = selectedTags.filter((t) => t !== this.innerText);
    } else {
      selectedTags.push(this.innerText);
    }

    this.classList.toggle('selected');
    hasSelectedTags = selectedTags.length > 0;
    dispatch('change', selectedTags);
  }

  function deselectAll(event: MouseEvent) {
    event.preventDefault();
    selectedTags = [];
    hasSelectedTags = false;
    dispatch('change', selectedTags);
  }

  function createTagURL(tag: string) {
    if (urlSearchParamKey === '') {
      return '';
    }
    const nextTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : selectedTags.concat([tag]);
    const params = new URLSearchParams([[urlSearchParamKey, nextTags.join(',')]]);
    return '?' + params.toString();
  }
</script>

<div class="tag-box">
  <div class="tag-title" class:hidden={hasSelectedTags}>{label}</div>
  <a href="?" class="tag-clear-button" class:hidden={!hasSelectedTags} on:click={deselectAll}>
    {resetButton}
  </a>

  <div class="tag-list">
    {#each tags as tag}
      <a
        href={createTagURL(tag)}
        class="tag"
        class:selected={selectedTags.includes(tag)}
        on:click={selectTag}
      >
        {tag}
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  .tag-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.2em;
    .tag-title {
      font-size: 1em;
      font-weight: bold;
      margin-right: 1em;
      cursor: default;
    }
    .hidden {
      display: none;
    }
    .tag-clear-button {
      margin-right: 1em;
      font-size: small;
      text-decoration: underline;
      cursor: pointer;
    }
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 0.2em;
      .tag {
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
      .tag-title {
        display: none;
      }
      .tag-clear-button {
        display: none;
      }
    }
  }
</style>
