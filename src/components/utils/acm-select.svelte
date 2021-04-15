<script lang="ts">
  export let defaultValue: string = "";
  export let options: string[] = [];
</script>

<select name="school-year" bind:value="{defaultValue}">
  {#each options as optionValue (optionValue)}
    <option value="{optionValue}">{optionValue}</option>
  {/each}
</select>

<style>
  select {
    background-color: var(--acm-dark);
    padding: 1em;
    color: var(--acm-light);
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    border-radius: 25px;
  }

  option {
    background-color: var(--acm-dark);
    color: var(--acm-light);
    border-radius: 25px;
  }
</style>
