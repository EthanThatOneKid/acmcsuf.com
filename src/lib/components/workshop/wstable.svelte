<script lang="ts">
  export let team: string;
  export let display: string;

  import type { WorkshopInfo } from './dummytable.ts';
  import { NewWorkshopTable } from './dummytable.ts';
  import { sSc, colorMap } from './wscommon.ts';

  let workshopsBySemester: Record<string, WorkshopInfo[]> = {};

  NewWorkshopTable()
    .then((tab) => {
      workshopsBySemester = tab[team].workshops;
    })
    .catch((err) => {
      console.log("Error loading table:", err);
    });

</script>

<div id="container">      

	<h2><a href={`https://acmcsuf.com/teams#${team}`}><strong style={`color: ${colorMap.get(team)}`}>{display}</strong></a> Workshops</h2>
	<div id='wsTable'>
		<table>
			<tr>
				<th>Series</th>
				<th>Workshops</th>
			</tr>
		{#each Object.entries(workshopsBySemester) as [semester, workshops]}
			<tr>
			  <th><a class="semes" href={`./workshops/${team}/${semester}`}>{sSc.get(semester)}</a></th>
			<th>{workshops.length}</th>
			</tr>
		{/each}
		</table>
	</div>
</div>

<style>
/* shoutout to Ethan for the css */
:global(#container) {
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
	color: #778087;
}

#container th,
#container td {
	border: 1px solid #ccc;
	padding-right: 60px;
	padding-left: 60px;
	padding-bottom: 15px;
	padding-top: 15px;
	vertical-align: top;
}

#container tbody th:first-child {
	font-weight: 700;
	color: #333;
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
