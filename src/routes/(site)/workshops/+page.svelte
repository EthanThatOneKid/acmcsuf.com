<script lang="ts">
  //import WSTable from './wstable.svelte';
  import WSTable from '$lib/components/workshop/wstable.svelte';
  import Spacing from '$lib/public/legacy/spacing.svelte';
</script>

<svelte:head>
  <title>Workshops | ACM at CSUF</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<div class="workshops">
  <h1 id="header">Workshops</h1>
  <div id="wscontainer">
    <div id="wsdesc">
      <p>
        Workshops are a great way to learn new skills and meet new people. Here are the workshops we
        have hosted over the semesters!
      </p>
      <br />
      <p>To view a team's workshops, select a semester from below.</p>
    </div>
    <WSTable team="general" display="General" />
    <WSTable team="ai" display="AI" />
    <WSTable team="algo" display="Algo" />
    <WSTable team="design" display="Design" />
    <WSTable team="dev" display="Dev" />
    <WSTable team="gamedev" display="Game Dev" />
    <WSTable team="icpc" display="ICPC" />
    <WSTable team="nodebuds" display="Node Buds" />
    <WSTable team="oss" display="Open Source" />
  </div>
</div>

<style>
  body {
    overflow: hidden;
  }
  #header {
    text-align: center;
  }

  #wsdesc {
    text-align: center;
    margin-right: 100px;
    margin-left: 100px;
    margin-bottom: 20px;
  }
  #wscontainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
  }
</style>
