<script lang="ts">
  import type { Color } from './colors';

  export let data: Color;
</script>

<code class="color-id" style:--color={data.hex}>{data.id}</code>
