<script lang="ts">
  import type { ListItem } from './types';

  export let data: ListItem[];
</script>

<ul class="recursive-ul">
  {#each data as item, i (i)}
    <li class="recursive-ul__item">
      {@html item.html}
      {#if item.children}
        <svelte:self data={item.children} />
      {/if}
    </li>
  {/each}
</ul>
