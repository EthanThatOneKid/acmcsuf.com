<div id="why-join-nodebuds">
  <img
    src="../assets/png/why-join-node-buds-illustration.png"
    alt="Why Join nodeBuds"
    title="Why Join nodeBuds"
  />
  <div class="turnback">
    <h2>why join node<span class="brand-red">Buds</span>?</h2>
    <p>
      <span class="brand-em">node<span class="brand-red">Buds</span></span>
      was designed to provide underclassmen and transfer students assistance as they
      start their fresh journey through
      <span class="brand-blue brand-em">CSUF</span>, and through the tech
      industry. We provide the knowledge and resources that’ll help students
      start on the right foot.
    </p>
  </div>
</div>

<style>
  #why-join-nodebuds {
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: space-around;

    margin: auto; /* center */
    padding: 4em 2em;
  }

  /* Make the image take over a bit more than half at full size. */
  #why-join-nodebuds > img {
    width: 55%;
  }
  /* Fill the rest with the text box. */
  #why-join-nodebuds > .turnback {
    flex: 1;
  }

  /* Magic title flipping - "turnback".
   * TODO: this could be copy-pasted into global.css. */
  .turnback {
    display: flex;
    flex-direction: column;

    font-size: var(--fluid-font-size);
    padding-left: 2em;
    padding-right: 2em;

    align-items: flex-start; /* account for short texts */
    text-align: left; /* account for multi-line texts */
  }
  .turnback:nth-child(even) {
    align-items: flex-end;
    text-align: right;
  }

  .turnback > p {
    font-size: var(--p-font-size);
  }
  .turnback > h2 {
    font-size: var(--h-font-size-med);
    font-weight: 600; /* medium, not bold */
  }

  /* Mobile view */
  @media screen and (max-width: 1440px) {
    #why-join-nodebuds {
      flex-direction: column;
    }

    #why-join-nodebuds > img {
      width: max(55vw, 550px);
      max-width: 100%;
    }
    #why-join-nodebuds > .turnback > p {
      max-width: max(30vw, 300px);
    }

    .turnback,
    .turnback:nth-child(even) {
      align-items: center;
      text-align: center;

      padding-top: 4em;
    }
  }
</style>
