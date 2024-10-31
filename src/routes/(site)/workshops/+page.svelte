<script>
  import Spacing from '$lib/public/legacy/spacing.svelte';
</script>

<Spacing --min="125px" --med="150px" --max="150px" />

<div class="hero-container">
  <h1>Open Source Software Workshops</h1>
  <br><br>
  <table>
    <tr>
      <th>Workshop</th>
      <th>Timestamp</th>
      <th class="desc">Description</th>
    </tr>
    <tr>
      <td>Intro to Java</td>
      <td>3/14/24</td>
      <td class="desc">Best language</td>
    </tr>
    <tr>
      <td>Intro to VIM</td>
      <td>2/29/24</td>
      <td class="desc">Best Editor</td>
    </tr>
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