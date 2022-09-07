<script lang="ts">
  export let progress: number;
  export let fillColor: string;
</script>

<div class="progress-bar" style={`--color-fill: ${fillColor}`}>
  <div class="progress-fill" style={`--progress-status: ${progress}%`} />
</div>

<style lang="scss">
  .progress-bar {
    width: 100px;
    height: 15px;
    background-color: gray;
    border-radius: 20px;
  }
  .progress-fill {
    width: var(--progress-status);
    height: 100%;
    background-color: var(--color-fill);
    border-radius: 20px;
    animation: progressMove 2.5s ease-in-out;
  }

  @keyframes progressMove {
    from {
      width: 0%;
    }
    to {
      width: var(--progress-status);
    }
  }
</style>
