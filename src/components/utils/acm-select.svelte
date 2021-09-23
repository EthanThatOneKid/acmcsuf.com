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
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    padding: 8px 20px;
    border: none;
    border-radius: 8px;
    background-color: var(--acm-dark);
    color: var(--acm-light);
    outline: none;
    appearance: none;
    transition: background-color 0.25s ease-in-out;
  }

  select:hover {
    cursor: pointer;
    background-color: var(--acm-blue);
  }

  option {
    background-color: var(--acm-dark);
    color: var(--acm-light);
    font-weight: 500;
  }
</style>
