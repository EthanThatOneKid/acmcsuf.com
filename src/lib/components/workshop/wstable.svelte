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
          <th>Series</th>
          <th>Workshops</th>
        </tr>
        {#each Object.entries(workshopsBySemester) as [semester, workshops] (semester)}
          {#if workshops.length > 0}
            <tr>
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
  :global(#container) {
    overflow: hidden;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 15px;
    padding-bottom: 25px;
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
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 15px;
    padding-top: 15px;
    vertical-align: top;
  }

  #container tbody th:first-child {
    font-weight: 700;
  }

  #container a {
    cursor: pointer;
    text-decoration: none;
    border-bottom: 1px solid #ff2e88;
  }

  #container a:hover {
    background-color: #ff2e88;
    color: #fff;
  }
</style>
