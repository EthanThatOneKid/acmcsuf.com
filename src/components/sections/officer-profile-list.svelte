<script lang="ts">
  import { styleProps } from "../../actions/use-style-props";
  import { officers } from "../../lib/officers";
  import OfficerProfile from "@/components/sections/officer-profile.svelte";
  import AcmSelect from "@/components/utils/acm-select.svelte";

  let currentSchoolYear = "2020-2021";
</script>

<section>
  <h2>
    board
    <span class="brand-em brand-blue">officers</span>
  </h2>
  <div class="school-year-input-container">
    <AcmSelect
      bind:defaultValue="{currentSchoolYear}"
      options="{Object.keys(officers)}"
    />
  </div>
  <div class="officer-profile-list">
    {#each officers[currentSchoolYear] as { name, title, picture } (name)}
      <OfficerProfile
        name="{name}"
        title="{title}"
        picture="{picture}"
        key="{picture}"
      />
    {/each}
  </div>
</section>

<style>
  section h2 {
    text-align: center;
    font-weight: bold;
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
