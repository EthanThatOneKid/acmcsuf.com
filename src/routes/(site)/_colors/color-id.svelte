<script lang="ts">
  import type { Color } from './colors';

  export let data: Color;
</script>

<code class="color-id" id={data.id}>{data.id}</code>

<style>
  .color-id {
    scroll-margin-top: 100px;
  }
</style>
