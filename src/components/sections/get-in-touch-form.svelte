<section id="Get-In-Touch-Section">
  <h2>Get in touch</h2>
  <p>
    Have any questions for us? Want to work with us? Just want to say hi?
    Whatever it is, feel free to contact us! Send us an email by filling out the
    form below, and we’ll have a representative get back to you as soon as
    possible. Don’t worry, we’re friendly! 😊
  </p>
  <form id="Contact-Form" action="#">
    <formfield>
      <label for="form-name"></label>
      <input
        type="text"
        id="form-name"
        name="form-name"
        placeholder="name*"
        required
      />
      <label for="form-email"></label>
      <input
        type="text"
        id="form-email"
        name="form-email"
        placeholder="email*"
        required
      />
    </formfield>
    <label for="form-topic"></label>
    <input
      type="text"
      id="form-topic"
      name="form-topic"
      placeholder="topic*"
      required
    />
    <label for="form-message"></label>
    <textarea
      type="text"
      id="form-topic"
      name="form-name"
      placeholder="message*"
      required></textarea>
  </form>
</section>

<style>
  #Get-In-Touch-Section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #Get-In-Touch-Section :global(h2) {
    font-size: var(--subheading-font-size);
  }

  #Get-In-Touch-Section :global(p) {
    font-size: var(--body-font-size);
    text-align: center;
    margin: 0 3rem;
  }
  #Contact-Form {
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  formfield {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  #Contact-Form input[type="text"],
  #Contact-Form textarea {
    background-color: var(--acm-light);
    border-radius: 25px;
    font-size: var(--body-font-size);
    padding: 0.5em;
    margin: 0.5em;
    box-shadow: 0 6px 9px rgba(55, 146, 193, 0.5);
    border: none;
  }
  #Contact-Form textarea {
    resize: none;
  }

  @media screen and (min-width: 768px) {
    formfield {
      width: 100%;
      display: flex;
      flex-direction: row;
    }
    formfield input {
      flex-grow: 1;
    }
  }
</style>
