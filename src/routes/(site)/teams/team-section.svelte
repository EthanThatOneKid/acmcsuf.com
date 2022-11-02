<script lang="ts">
  import type { Team } from '$lib/public/board/types';
  import { TextAlignment } from '$lib/public/text-alignment/text-alignment';

  export let textAlign: TextAlignment = TextAlignment.RIGHT;
  export let info: Team | undefined;
</script>

<div class="container">
  {#if info !== undefined}
    <section id={info.id} class:👈={textAlign === TextAlignment.LEFT}>
      <img src={info.picture} alt={`acm${info.title} Logo`} />
      <div>
        <h2>
          <span class="headers size-lg">
            <span style:--font-color={info.color}>
              <span class="brand-em">{info.title}</span>
            </span>
            <span class="brand-em">Team</span>
          </span>
        </h2>
        <slot name="content" tag="p" />
      </div>
    </section>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
  }

  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1064px;
    margin: 0 32px;
    scroll-margin-top: 4rem;
  }

  section img {
    margin-left: -32px;
    width: 350px;
  }

  section div {
    text-align: right;
    max-width: 650px;
  }

  section div h2 {
    padding-bottom: 16px;
  }

  section div h2 span span {
    color: var(--font-color);
  }

  /* Left */
  .👈 {
    flex-direction: row-reverse;
  }

  .👈 div {
    text-align: left;
  }

  .👈 img {
    margin-right: -32px;
  }

  @media (max-width: 900px) {
    section,
    .👈 {
      flex-direction: column;
    }

    section div,
    .👈 div {
      text-align: center;
    }

    section img,
    .👈 img {
      margin: 0;
      width: 200px;
    }
  }
</style>
