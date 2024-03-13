<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // teamClasses maps team names to CSS class names. We call Object.entries on
  // it to make it easier to iterate and search.
  const teamClasses = {
    General: 'acm-blue',
    Algo: 'acm-purple',
    Create: 'acm-pink',
    Design: 'acm-pink',
    Dev: 'acm-bluer',
    AI: 'acm-emerald',
    Marketing: 'acm-red',
    'Special Events': 'acm-yellow',
    nodebuds: 'acm-heavier',
  };

  const dispatch = createEventDispatcher();
  let teamName: keyof typeof teamClasses = 'General';
</script>

<select
  bind:value={teamName}
  on:change={() => dispatch('change', { teamName, teamClass: teamClasses[teamName] })}
>
  {#each Object.keys(teamClasses) as name (name)}
    <option value={name} selected={name === teamName}>{name}</option>
  {/each}
</select>
