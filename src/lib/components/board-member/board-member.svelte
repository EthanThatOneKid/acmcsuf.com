<!--
TODO: Show complete board member preview.
- See: https://github.com/EthanThatOneKid/acmcsuf.com/blob/acac11c14edad5445d5e59dfb92afc36b96544e9/src/routes/(site)/about/officer-profile.svelte
- See: https://codepen.io/alancortez1337/pen/NWzKqKE?editors=1100
-->
<script lang="ts">
  import BoardPicture from './board-picture.svelte';

  export let src: string;
  export let teamColor: string;
</script>

<div class="board-member__container">
  <BoardPicture {src} color={teamColor} />
</div>

<style lang="scss">
  input,
  select {
    display: inline-block;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
</style>
