<script lang="ts">
  export let name: string = "";
  export let title: string = "";
  export let picture: string = "";
  export let key: string = "";
</script>

<div class="officer-container">
  <svg class="officer-image" viewBox="1 1 8 8">
    <pattern
      id="{`officer-image-${key}`}"
      patternUnits="userSpaceOnUse"
      width="{10}"
      height="{10}"
    >
      <image
        width="{10}"
        height="{10}"
        xlink:href="{`../assets/authors/${picture || 'placeholder.png'}`}"
      ></image>
    </pattern>
    <path
      d="M5.5 1.5 L8.5 4.5 Q9 5 8.5 5.5 L5.5 8.5 Q5 9 4.5 8.5 L 1.5 5.5 Q1 5 1.5 4.5 L4.5 1.5 Q 5 1 5.5 1.5z"
      fill="{`url(#officer-image-${key})`}"></path>
  </svg>
  <h3>
    {name}
  </h3>
  <p>{title}</p>
</div>

<style>
  .officer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 64px;
  }
  .officer-image {
    width: 200px;
    height: 200px;
  }
  h3 {
    font-size: 1.5rem;
    color: var(--acm-dark);
  }
</style>
