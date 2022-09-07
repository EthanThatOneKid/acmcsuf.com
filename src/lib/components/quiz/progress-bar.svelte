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
    background-color: gray;
    border-radius: 8px;
  }
  .progress-fill {
    width: var(--progress-status);
    height: 100%;
    background-color: var(--color-fill);
    border-radius: 8px;
    animation: progressMove 2.5s ease-in-out;
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
    }
  }

  @media screen and (max-width: 740px) {
    .progress-bar {
      height: 30px;
    }
  }
</style>
