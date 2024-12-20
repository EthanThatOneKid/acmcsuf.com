<script>
  export let logos = [];
</script>

<div class="logos-container">
  {#each logos as logo}
    <div class="logo-card">
      <img src={logo.image} alt={logo.alt} />
      <div class="logo-info">
        <h4>{logo.title}</h4>
        <div class="downloads">
          <a href={logo.svg} target="_blank" download>SVG <span>&#128190;</span></a>
          <a href={logo.png} target="_blank" download>PNG <span>&#128190;</span></a>
        </div>
      </div>
    </div>
  {/each}
</div>
<style>
  .logos-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }

  .logo-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background: #052155;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }


  .logo-card:hover {
    transform: translateY(-10px); 
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
  }

  .logo-card img {
    max-width: 100px;
    height: auto;
    margin-bottom: 15px;
    transition: transform 0.3s ease;
  }

  .logo-card:hover img {
    transform: scale(1.1); 
  }

  .logo-info {
    text-align: center;
  }

  .downloads a {
    margin: 0 10px;
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .downloads a:hover {
    color: #0056b3; 
  }
</style>