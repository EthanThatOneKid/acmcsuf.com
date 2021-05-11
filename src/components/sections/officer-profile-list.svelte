<script lang="ts">
  import { officers } from "../../lib/officers";
  import OfficerProfile from "@/components/sections/officer-profile.svelte";
  import AcmSelect from "@/components/utils/acm-select.svelte";
  import Spacing from "@/components/sections/spacing.svelte";

  let currentSchoolYear = "2020-2021";
</script>

<section>
  <h2>
    Board
    <span class="brand-blue">Officers</span>
  </h2>

  <Spacing amount="30px" />

  <div class="school-year-input-container">
    <AcmSelect
      bind:defaultValue="{currentSchoolYear}"
      options="{Object.keys(officers)}"
    />
  </div>

  <Spacing amount="30px" />

  <div class="officer-profile-list">
    {#each officers[currentSchoolYear] as { name, title, picture } (name)}
      <OfficerProfile name="{name}" title="{title}" picture="{picture}" />
    {/each}
  </div>
</section>

<style>
  section h2 {
    text-transform: lowercase;
    text-align: center;
    font-size: var(--heading-font-size);
  }

  .school-year-input-container {
    min-width: 100px;
    text-align: center;
  }

  .officer-profile-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }
</style>
