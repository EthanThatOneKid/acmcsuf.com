<script lang="ts">
import { onMount } from "svelte";
  import Spacing from "../../../lib/public/legacy/spacing.svelte";
import { NewWorkshopTable } from "./tablesv2.ts";
  const semesters = ["Fall 2025"];
let table; 
console.log("Mounting");
/*onMount(async () => {
	try {
		const { NewWorkshopTable } = await import("./tables");
		console.log("Mount");
		table = await NewWorkshopTable();
		console.log("loaded table:", table);
	} catch (err) {
		console.error("onmount error", err);
	}
});
*/

const loadTable = () => {
	console.log("Mount");
	table = NewWorkshopTable();
	console.log("Loaded table");
}

loadTable();
console.log(table);

</script>

<svelte:head>
  <title>Workshops | ACM at CSUF</title>
</svelte:head>


<Spacing --min="175px" --med="200px" --max="200px" />

<div class="workshops">
  <h1>Workshops</h1>
  <div>
    <h2>General</h2>
    <tbody>
      <tr>
        <th>Series</th>
        <th>Workshops</th>
      </tr>
      <!--{#each semesters as semester}
      <tr>
        <td {My route goes here}>{semester}</td>
        <td>10</td>
      </tr>
      {/each}-->
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
