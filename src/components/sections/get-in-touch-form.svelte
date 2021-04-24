<script lang="ts">
  export let googleFormUrl: string | undefined = undefined;
</script>

<section>
  <h2>Get in touch</h2>
  <p>
    Have any questions for us? Want to work with us? Just want to say hi?
    Whatever it is, feel free to contact us! Send us an email by filling out the
    form below, and we’ll have a representative get back to you as soon as
    possible. Don’t worry, we’re friendly! 😊
  </p>
  {#if googleFormUrl === undefined}
    <form action="#">
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
  {:else}
    <iframe
      src="{googleFormUrl}"
      title="acmCSUF contact form"
      width="100%"
      height="1024"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
    >
      Loading…
    </iframe>
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  section :global(h2) {
    font-size: var(--subheading-font-size);
  }

  section :global(p) {
    font-size: var(--body-font-size);
    text-align: center;
    margin: 2rem 3rem;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  formfield {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  form input[type="text"],
  form textarea {
    background-color: var(--acm-light);
    border-radius: 25px;
    font-size: var(--body-font-size);
    padding: 0.5em;
    margin: 0.5em;
    box-shadow: 0 6px 9px rgba(55, 146, 193, 0.5);
    border: none;
  }

  form textarea {
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
