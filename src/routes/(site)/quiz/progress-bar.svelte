<script lang="ts">
  export let progress: number;
  export let fillColor: string;
</script>

<div class="progress-bar" style={`--color-fill: ${fillColor}`}>
  <div class="progress-fill" style={`--progress-status: ${progress}%`} />
  <h3>{progress.toFixed(0)}%</h3>
</div>

<style lang="scss">
  .progress-bar {
    position: relative;
    width: 200px;
    height: 25px;
    background-color: var(--progress-bg);
    border-radius: 8px;
  }
  .progress-fill {
    width: var(--progress-status);
    height: 100%;
    background-color: var(--color-fill);
    border-radius: 8px;
    animation: progressMove 2s ease-in-out;
  }

  h3 {
    width: 40px;
    position: absolute;
    bottom: -12%;
    left: 5%;
  }

  @keyframes progressMove {
    from {
      width: 0%;
    }
    to {
      width: var(--progress-status);
      border-radius: 8px;
    }
  }

  @media screen and (max-width: 740px) {
    .progress-bar {
      height: 30px;
    }
  }

  :global(.light) {
    --progress-bg: rgba(224, 224, 224, 0.918);
  }

  :global(.dark) {
    --progress-bg: #808080;
  }

  @media (prefers-color-scheme: light) {
    :global(body:not(.dark)) {
      --progress-bg: rgba(224, 224, 224, 0.918);
    }
  }

  @media (prefers-color-scheme: dark) {
    :global(body:not(.light)) {
      --progress-bg: #808080;
    }
  }
</style>
