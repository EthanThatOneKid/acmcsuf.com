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
    <CallToAction text="Join us today!" />
  </div>
  <figure>
    <img
      src="/assets/authors/placeholder.png"
      alt="Frank the shark (ACM CSUF's mascot) is holding a flag that says 'I ♥ ACM'"
    />
  </figure>
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
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
  }

  section div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  section div h1 {
    font-weight: bold;
    font-size: 1.5rem;
  }

  section div h1 span[as="em"] {
    color: var(--acm-blue);
  }

  section figure {
    display: flex;
  }

  section figure img {
    width: 370px;
  }

  @media (min-width: 768px) {
    section {
      flex-direction: row;
    }
    section div h1 {
      font-size: 3rem;
    }
  }
</style>
