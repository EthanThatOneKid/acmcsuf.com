<script>
  import CallToAction from "../ui/call-to-action.svelte";
</script>

<!-- TODO(Ethan): Add image and more CSS!!! -->

<section>
  <div>
    <h1>
      <span>we are the largest tech<br />community at</span>
      <span as="em">CSUF</span>
    </h1>
    <CallToAction text="join us today!" />
  </div>
</section>

<!-- .screen-hero {
  background: 90% 50% no-repeat url(../assets/badges/acm-blank.svg);

  div {
    @include fluidSize(10, 128, $propName: "margin-left");
    padding-top: 221px;
    min-width: "max-content";
    h1 {
      @include fluidSize($minHFontSize, $maxHFontSize);
      @include fluidSize(
        $minPFontSize,
        $maxPFontSize,
        $propName: "padding-bottom"
      );
      font-weight: bold;
    }
  }
} -->
<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  section div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  section div h1 {
    font-weight: bold;
  }

  section div h1 span[as="em"] {
    color: var(--acm-blue);
  }
</style>
