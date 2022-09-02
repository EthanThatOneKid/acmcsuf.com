<script>
  import Spacing from '$lib/components/sections/spacing.svelte';
  import AcmItinerary from '$lib/components/utils/acm-itinerary.svelte';
</script>

<svelte:head>
  <title>CS Survival Guide!</title>
</svelte:head>

<Spacing --min="175px" --med="200px" --max="200px" />

<section class="img-section">
  <img src="/assets/cssg/cssg.png" alt="CS Survival Guide flyer" class="flyer" />
</section>

<Spacing --min="100px" --med="175px" --max="200px" />

<section class="itin-section">
  <AcmItinerary
    data={[
      {
        title: 'Opening Remarks',
        location: 'ECS Quad',
        formattedStartingTime: '3:00 PM',
      },
      {
        title: 'Lunch + Club Discovery',
        location: 'ECS Quad',
        formattedStartingTime: '3:30 PM',
      },
      {
        title: "Let's Git Technical",
        location: 'CS 102A',
        formattedStartingTime: '4:00 PM',
      },
      {
        title: 'Computer Science as a Career',
        location: 'CS 102B',
        formattedStartingTime: '4:00 PM',
      },
      {
        title: 'Learning Linux',
        location: 'CS 110A',
        formattedStartingTime: '4:00 PM',
      },
      {
        title: 'Closing Remarks',
        location: 'ECS Quad',
        formattedStartingTime: '6:00 PM',
      },
    ]}
  >
    <div slot="title">
      <h1 class="size-lg">CS Survival Guide Itinerary</h1>
      <p class="size-md">An introduction to CS at CSUF For students, by students</p>
    </div>
  </AcmItinerary>
</section>

<Spacing --min="100px" --med="175px" --max="200px" />

<section class="img-section">
  <img src="/assets/cssg/workshop-details.png" alt="Workshop details" />
</section>

<Spacing --min="100px" --med="175px" --max="200px" />

<section class="img-section">
  <img src="/assets/cssg/special-thanks.png" alt="Special thanks" />
</section>

<Spacing --min="100px" --med="175px" --max="200px" />

<style lang="scss">
  .itin-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 16px;
    margin: 0 auto;
    max-width: 1200px;
  }

  .itin-title {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .img-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 16px;
    margin: 0 auto;
    max-width: 600px;

    img {
      width: 100%;
      max-width: 600px;
    }
  }
</style>
