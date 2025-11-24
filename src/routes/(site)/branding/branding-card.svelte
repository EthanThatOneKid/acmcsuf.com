<script lang="ts">
  import type { Branding } from '$lib/public/branding';
  import Logo from './Logos.svelte';
  export let info: Branding;
</script>

<h2>{info.title} Team Assets</h2>

<div class="assets-container">
  <div>
    <h3>LOGO</h3>
    <Logo team_info={info} logo={info.teamLogo} />
  </div>

  <div>
    {#if info.teamColor}
      <h3>COLOR</h3>
      <div class="color-container" style="background-color: {info.teamColor.hex};">
        <div class="color-info">
          <p><strong>{info.teamColor.name}</strong></p>
          <p>({info.teamColor.rgb})</p>
          <p>{info.teamColor.hex}</p>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  h3 {
    margin-bottom: 10px;
  }
  .color-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    height: 160px;
  }

  .color-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  strong {
    color: black;
  }

  .color-info p {
    margin: 0;
    color: black;
  }

  .assets-container {
    display: grid;
    align-items: start;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    margin-bottom: 60px;
    margin-top: 10px;
  }
</style>
