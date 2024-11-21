<script lang="ts">
  import EmptyContainer from "../events/empty-container.svelte";

  export let title: string;
  export let date: string;
  export let desc: string;
</script>

<td>{title}</td>
<td>{date}</td>
<td class="desc">{desc}</td>

<style>
  td {
    border: 3px gray solid;
    padding: 7px;
    text-align: center;
  }
  .desc {
    padding-left: 35px;
    padding-right: 35px;
  }
</style>