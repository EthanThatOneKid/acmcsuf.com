<script lang="ts">
  import type { Branding } from '$lib/public/branding';
  export let team_info: Branding;
  export let logo = team_info.teamLogo;
</script>

<div class="logo-card">
  <img class="team-logo" src={logo.image} alt={logo.alt} />
  <div class="logo-info">
    <div class="downloads">
      <a href={logo.svg} target="_blank" download
        >SVG <img src="/assets/download-icon.png" alt="download=icon" /></a
      >
      <a href={logo.png} target="_blank" download
        >PNG <img src="/assets/download-icon.png" alt="download=icon" /></a
      >
    </div>
  </div>
</div>

<style>
  .logo-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: rgb(250, 249, 249);
    text-align: center;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    height: 160px;
  }

  .logo-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .logo-card img {
    max-width: 100px;
    height: auto;
    margin-bottom: 15px;
    transition: transform 0.3s ease;
  }

  .logo-card:hover .team-logo {
    transform: scale(1.1);
  }

  .logo-info {
    text-align: center;
  }

  .downloads a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin: 0 10px;
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .downloads a img {
    width: 1em;
    height: 1em;
    transform: translateY(6px);
  }

  .downloads a:hover {
    color: #0056b3;
  }

  @media (max-width: 480px) {
    .downloads a {
      display: flex;
    }
    .logo-card img {
      margin-bottom: 11px;
    }
  }
</style>
