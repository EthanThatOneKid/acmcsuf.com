<script lang="ts">
  import type { Branding } from '$lib/public/branding';
  import Logo from './Logos.svelte';
  export let info: Branding;
</script>

<div class="TeamCard">
  <h2>{info.title} Team Assets</h2>
  <p>{info.description}</p>

  <!-- Logos -->
    <h3>LOGO</h3>
    <Logo team_info={info} logo={info.teamLogo} />

  <!-- Team Color -->
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

<style>
  .color-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
</style>
