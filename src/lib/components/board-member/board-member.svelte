<script lang="ts">
  import BoardPicture from './board-picture.svelte';

  export let src: string;
  export let alt: string;
  export let color = 'var(--acm-general-rgb)';
</script>

<div class="board-member__container" title={alt}>
  <BoardPicture {src} {color} />
</div>

<style lang="scss">
  .board-member__container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
