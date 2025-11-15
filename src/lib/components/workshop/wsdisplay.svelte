<script lang="ts">
  import type { semesters, teams, WorkshopInfo } from './table';
  import { NewWorkshopTable } from './table';
  import { tSc, sSc, colorMap } from './wscommon';

  export let team: teams;
  export let sem: semesters;
  let workshopsBySemester: WorkshopInfo[] = []; //= new Map();

  NewWorkshopTable()
    .then((tab) => {
      //workshopsBySemester = tab[team as teams].workshops[sem as semesters];
      workshopsBySemester = tab[team as teams].workshops[sem as semesters];
    })
    .catch((err) => {
      console.log('Error loading table:', err);
    });
</script>

<div id="container">
  <h1>
    <a href={`https://acmcsuf.com/teams#${team}`}
      ><strong style={`color: ${colorMap.get(team)}`}>{tSc.get(team)}</strong></a
    >
    {sSc.get(sem)}
  </h1>
  <div id="wsTable">
    <table>
      <tbody>
        <tr>
          {#if workshopsBySemester.length > 1}
            <th>Workshops</th>
          {:else}
            <th>Workshop</th>
          {/if}
        </tr>
        {#each Object.entries(workshopsBySemester) as [key, data] (key)}
          <tr>
            <th><a class="semes" href={data['link']}>{data['name']}</a></th>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <p><a href="../../workshops"> ↩ Back to Workshops</a></p>
</div>

<style>
  /* shoutout to Ethan for the css */
  :global(#container) {
    overflow: hidden;
    padding: 30px;
  }

  #container h2 {
    margin-bottom: 1rem;
    line-height: 1.3em;
  }

  #container table {
    width: 100%;
    border-collapse: collapse;
  }

  #container th,
  #container td {
    border: 1px solid #ccc;
    padding: 10px;
    vertical-align: top;
  }

  #container tbody th:first-child {
    font-weight: 700;
  }

  #container a {
    cursor: pointer;
    color: #ff2e88;
    text-decoration: none;
    border-bottom: 1px solid #ff2e88;
  }

  #container a:hover {
    background-color: #ff2e88;
    color: #fff;
  }
</style>
