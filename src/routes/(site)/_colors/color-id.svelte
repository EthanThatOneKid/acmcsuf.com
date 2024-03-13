<script lang="ts">
  import type { Color } from './colors';

  export let data: Color;
</script>

<a id={data.id} class="color-id" href="#{data.id}"><code>{data.id}</code></a>

<style>
  .color-id {
    scroll-margin-top: 100px;
    text-decoration: none;
  }
</style>
