<script lang="ts">
  import AcmButton from "@/components/utils/acm-button.svelte";
  import { links } from "../../lib/links";
</script>

<section>
  <div class="main-text">
    <h2 class="headers size-l">Ready to get started?</h2>
    <p class="size-xs">
      We invite all to join our student chapter consisting of
      <span class="headers">350+</span> passionate tech enthusiasts. Each of our
      workshops, info sessions, and community events were designed to kickstart your
      tech journey on the right foot.
    </p>
  </div>
  <AcmButton text="Join us today!" link="{links.discord}" />
</section>

<style lang="scss">
  @import "static/theme.scss";

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0 24px;
  }

  section .main-text {
    max-width: 950px;
  }

  section p {
    margin-top: 16px;
  }
</style>
