<script lang="ts">
  export let data: ItineraryItem[] = [];

  interface ItineraryItem {
    title: string;
    location: string;
    formattedStartingTime: string;
  }
</script>

<div class="container">
  <slot name="title" />
  <div class="itinerary">
    {#each data as item}
      <div class="item">
        <div class="time">
          <span class="time-start">{item.formattedStartingTime}</span>
        </div>

        <div class="info">
          <span class="title">{item.title}</span>
          <span class="location">{item.location}</span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 1280px;
    margin: 0 32px 0 32px;

    .itinerary {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;

      .item {
        display: flex;
        flex-direction: row;
        gap: max(36px, 36vw);

        .time {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 100px;
        }

        .info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      }
    }
  }
</style>
