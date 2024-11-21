<script lang="ts">
  import Workshop from "./workshop.svelte";

  export let team: string;
  export let data: string[][]; // subsitute for later data
</script>

<div class="hero-container">
  <h1>{team} Workshops</h1>
  <br><br>
  <table>
    <tr>
      <th>Workshop</th>
      <th>Timestamp</th>
      <th class="desc">Description</th>
    </tr>
    {#each {length: 2} as _, i}
      <tr>
        <Workshop title={data[i][0]} date={data[i][1]} desc={data[i][2]} />
      </tr>
    {/each}
    <!-- <tr>
      <td>Intro to VIM</td>
      <td>2/29/24</td>
      <td class="desc">Best Editor</td>
    </tr> -->
  </table>
</div>


<style>
  .hero-container {
    margin: 40px;
  }
  table {
    border: 3px white solid;
    margin: auto;
  }
  th {
    background-color: var(--acm-abyss);
  }
  th, td {
    border: 3px gray solid;
    padding: 7px;
  }
  .desc {
    padding-left: 35px;
    padding-right: 35px;
  }
</style>