<script>
  export let title;
  export let description;
  export let teamLogos = [];
  export let teamColor = {}; // Contains name, hex, and rgb

  import Logos from './Logos.svelte';
</script>

<div class="TeamCard">
  <h2>{title} Team Assets</h2>
  <p>{description}</p>
  
  <!-- Logos -->
  {#if teamLogos.length > 0}
    <h3>LOGOS</h3>
    <Logos logos={teamLogos} />
  {/if}

  <!-- Color -->

  <!-- this shows a box on the container   -->
  {#if teamColor}
    <h3>COLOR</h3>
    <div class="color-container">
      <div
        class="color-box"
        style="background-color: {teamColor.hex};"
      ></div>
      <div class="color-info">
        <p><strong>{teamColor.name}</strong></p>
        <p>({teamColor.rgb})</p>
        <p>{teamColor.hex}</p>
      </div>
    </div>
  {/if}

  <!-- this makes the whole container the brand color  -->
   {#if teamColor}
    <h3>COLOR</h3>
    <div
      class="color-container"
      style="background-color: {teamColor.hex};"
    >
      <div class="color-info">
        <p><strong>{teamColor.name}</strong></p>
        <p>({teamColor.rgb})</p>
        <p>{teamColor.hex}</p>
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

  .color-box {
    width: 100px;
    height: 100px;
    border-radius: 8px;
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
