<!--
TODO: Show board member preview.
- See: https://github.com/EthanThatOneKid/acmcsuf.com/blob/acac11c14edad5445d5e59dfb92afc36b96544e9/src/routes/(site)/about/officer-profile.svelte
- See: https://codepen.io/alancortez1337/pen/NWzKqKE?editors=1100
-->
<script lang="ts">
  import BoardPicture from './board-picture.svelte';

  export let src: string;
  export let teamName: string;
  export let teamClass: string;
  export let teamColor: string;

  let name = 'Board member';
  let title = 'General board member';

  $: titleHTML = teamName
    ? title.replace(teamName, `<b class="${teamClass}">${teamName}</b>`)
    : title;
</script>

<div class="board-member__container">
  <BoardPicture {src} color={teamColor} />
  <div class="officer-placard">
    <input type="text" bind:value={name} class="officer-name" />
    <p class="officer-position">{@html titleHTML}</p>
  </div>
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
