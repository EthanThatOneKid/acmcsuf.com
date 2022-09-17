<script lang="ts">
  import { TextAlignment } from '$lib/legacy/text-alignment';

  export let align: TextAlignment = TextAlignment.CENTER;
</script>

<section style:--alignment={align}>
  <div>
    <slot name="headline" tag="h2" class="headline" />
    <slot name="text" tag="p" class="text" />
  </div>
</section>

<style lang="scss">
  section {
    --alignment: center;

    display: flex;
    justify-content: center;
    text-align: var(--alignment);
    margin: 0 24px;
  }

  section div {
    width: min(1150px, calc(70% + 100px));
  }

  section div :global(h2) {
    font-weight: 600;
  }

  section div :global(p) {
    margin-top: 16px;
  }
</style>
