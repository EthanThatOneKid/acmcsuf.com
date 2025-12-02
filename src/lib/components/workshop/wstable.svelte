<script lang="ts">
  import type { teams, WorkshopInfo } from './table';
  import { NewWorkshopTable } from './table';
  import { sSc, colorMap } from './wscommon';

  export let team: teams;
  export let display: string;
  let workshopsBySemester: Record<string, WorkshopInfo[]> = {};

  NewWorkshopTable()
    .then((tab) => {
      workshopsBySemester = tab[team as teams].workshops;
    })
    .catch((err) => {
      console.log('Error loading table:', err);
    });
</script>

<div id="container">
  <h2>
    <a href={`https://acmcsuf.com/teams#${team}`}
      ><strong style={`color: ${colorMap.get(team)}`}>{display}</strong></a
    > Workshops
  </h2>
  <div id="wsTable">
    <table>
      <tbody>
        <tr>
          <th>Semesters</th>
          <th># of Workshops</th>
        </tr>
        {#each Object.entries(workshopsBySemester) as [semester, workshops] (semester)}
          {#if workshops.length > 0}
            <tr style={`--team-color: ${colorMap.get(team)}`}>
              <th
                ><a class="semes" href={`./workshops/${team}/${semester}`}>{sSc.get(semester)}</a
                ></th
              >
              <th>{workshops.length}</th>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  /* shoutout to Ethan for the css */
  #container {
    overflow: hidden;
    padding-top: 15px;
    padding-bottom: 25px;
    margin-left: 30px;
    margin-right: 30px;
  }

  #container h2 {
    margin-bottom: 1rem;
    line-height: 1.3em;
  }

  #container table {
    border-collapse: collapse;
    table-layout: fixed;
  }

  #container th,
  #container tr {
    color: var(--team-color);
    border: 1px solid #ccc;
    vertical-align: top;
    width: 220px;
    padding-bottom: 15px;
    padding-top: 15px;
  }

  #container tbody th:first-child {
    font-weight: 700;
  }

  #container a {
    cursor: pointer;
    color: var(--team-color);
    text-decoration: none;
  }

  #container a:hover {
    border-bottom: 1px solid #ff2e88;
  }
</style>
