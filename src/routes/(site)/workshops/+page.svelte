<script lang="ts">
  import Spacing from "../../../lib/public/legacy/spacing.svelte";

  const semesters = ["Fall 2025"];

</script>

<svelte:head>
  <title>Workshops | ACM at CSUF</title>
</svelte:head>


<Spacing --min="175px" --med="200px" --max="200px" />

<div class="workshops">
  <h1>Workshops</h1>
  <!--<h2>{semester}</h2>-->
  <button>Fall 2025</button>
  <div>
    <h2>General</h2>
    <tbody>
      <tr>
        <th>Series</th>
        <th>Workshops</th>
      </tr>
      {#each semesters as semester}
      <tr>
        <td {My route goes here}>{semester}</td>
        <td>10</td>
      </tr>
      {/each}
    </tbody>
  </div>

  <div>
    <h2>AI</h2>
    
  </div>

  <div>
    <h2>Algo</h2>
    
  </div>

  <div>
    <h2>Design</h2>
    
  </div>

  <div>
    <h2>Dev</h2>
    
  </div>

  <div>
    <h2>Game Dev</h2>
    
  </div>

  <div>
    <h2>ICPC</h2>
    
  </div>

</div>