<script lang="ts">
  export let tags: string[] = [];
  export let selected: string[] = [];
  export let label: string = '';
  export let resetButton: string = '';
  export let onChange: (tags: string[]) => void;
  let hasSelectedTags = false;

  function selectTag(event: any) {
    if (selected.includes(event.target.innerText)) {
      selected = selected.filter((t) => t !== event.target.innerText);
    } else {
      selected.push(event.target.innerText);
    }

    event.target.classList.toggle('selected');
    hasSelectedTags = selected.length > 0;
    onChange(selected);
  }

  function clearFilter() {
    selected = [];
    hasSelectedTags = false;
    onChange(selected);
  }
</script>

<div class="tag-box">
  <div class="tag-title" class:hidden={hasSelectedTags}>{label}</div>
  <div class="tag-clear-button" class:hidden={!hasSelectedTags} on:click={clearFilter}>
    {resetButton}
  </div>
  <div class="tag-list">
    {#each tags as tag}
      <div class="tag" class:selected={selected.includes(tag)} on:click={selectTag}>
        {tag}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .tag-box {
    display: flex;
    align-items: center;
    justify-content: center;
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
      color: #424242;
      text-decoration: underline;
      cursor: pointer;
    }
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      // justify-content: space-around;
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

        &:hover {
          // background-color: #b0bec5;
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
