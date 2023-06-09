<script lang="ts">
  import BoardPicture from './board-picture.svelte';

  export let src: string;
  export let teamColor = 'var(--acm-general-rgb)';
</script>

<div class="board-member__container">
  <BoardPicture {src} color={teamColor} />
</div>

<style lang="scss">
  .board-member__container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
