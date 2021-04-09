<div class="turnback">
  <div class="why-join-nodebuds">
    <!-- <img src="../assets/png/why-join-node-buds-illustration.png" alt="" /> -->

    <object
      type="image/png"
      data="../assets/png/why-join-node-buds-illustration.png"
      title="Why Join nodeBuds"></object>
    <div>
      <h2>why join node<span class="brand-red">buds</span>?</h2>
      <p>
        <span class="brand-em">node<span class="brand-red">Buds</span></span>
        was designed to provide underclassmen and transfer students assistance as
        they start their fresh journey through
        <span class="brand-blue brand-em">CSUF</span>, and through the tech
        industry. We provide the knowledge and resources that’ll help students
        start on the right foot.
      </p>
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../style/theme.scss";

  .turnback {
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 4em 2em 0;

      &:nth-child(even) {
        flex-flow: row-reverse;
        div {
          align-items: flex-start;
          p {
            text-align: left;
          }
        }
      }

      @media screen and (max-width: 1440px) {
        flex-direction: column;
        align-items: center;
        flex-flow: column !important;
        div {
          justify-content: center;
          align-items: center;
          p,
          h2 {
            width: 100%;
            text-align: center !important;
          }
        }
      }

      object {
        @include fluidSize(237, 932, $propName: "width");
        @include fluidSize(80, 314, $propName: "height");
      }
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        flex-flow: column !important;
        h2 {
          @include fluidSize($minHFontSize, $maxHFontSizeMed);
          text-align: center;
          font-weight: bold;
        }
        p {
          @include fluidSize($minPFontSize, $maxPFontSize);
          @include fluidSize(150, 800, $propName: "width");
          text-align: right;
        }
      }
    }
  }
</style>
