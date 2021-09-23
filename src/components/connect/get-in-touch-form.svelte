<script lang="ts">
  export let googleFormId: string | undefined = undefined;
  let googleFormUrl: string | undefined = undefined;
  if (googleFormId !== undefined) {
    googleFormUrl = `https://docs.google.com/forms/d/e/${googleFormId}/viewform?embedded=true`;
  }
</script>

<section>
  {#if googleFormUrl === undefined}
    <span class="intro">
      <h2 class="headers">Get in touch</h2>
      <p>
        Got any questions for us? Want to collaborate? Just want to say hi?
        Whatever it is, feel free to contact us! Send us an email by filling out
        the form below, and we’ll have a representative get back to you as soon
        as possible.
      </p>
    </span>

    <form action="#">
      <span>
        <label for="form-name" class="mid">Name</label>
        <input
          type="text"
          id="form-name"
          name="form-name"
          placeholder="Your name..."
          required
        />
      </span>

      <span>
        <label for="form-email" class="mid">Email</label>
        <input
          type="text"
          id="form-email"
          name="form-email"
          placeholder="Your email..."
          required
        />
      </span>

      <span>
        <label for="form-topic" class="mid">Subject</label>
        <input
          type="text"
          id="form-topic"
          name="form-topic"
          placeholder="Your subject..."
          required
        />
      </span>

      <span>
        <label for="form-message" class="mid">Message</label>
        <textarea
          type="text"
          id="form-message"
          name="form-message"
          placeholder="Your message..."
          required></textarea>
      </span>

      <input
        type="submit"
        id="form-submit"
        name="form-submit"
        placeholder="Submit"
      />
    </form>
  {:else}
    <iframe
      src="{googleFormUrl}"
      title="acmCSUF contact form"
      width="100%"
      height="962"
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
    margin: 0 24px;
  }

  section .intro {
    text-align: center;
    margin-bottom: 64px;
  }

  section :global(h2) {
    font-size: 36px;
    padding-bottom: 16px;
  }

  section :global(p) {
    font-size: 16px;
    text-align: center;
    max-width: 1050px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  form input[type="text"],
  form textarea {
    background-color: var(--acm-light);
    border-radius: 12px;
    font-size: 14px;
    padding: 12px 24px;
    margin-top: 8px;
    margin-bottom: 32px;
    filter: drop-shadow(0 2px 8px rgba(16, 19, 21, 0.1));
    -webkit-filter: drop-shadow(0 2px 8px rgba(16, 19, 21, 0.1));
    border: none;
    outline: none;
    resize: none;
    min-width: 1156px;
  }

  #form-message {
    min-height: 250px;
  }

  #form-submit {
    display: flex;
    text-align: center;
    cursor: pointer;
    user-select: none;
    text-decoration: none;
    border-radius: 12px;
    border: none;
    padding: 12px 24px;
    background-color: var(--acm-dark);
    color: var(--acm-light);
    font-size: 24px;
    font-weight: 600;
    max-width: 136px;
    transition: background-color 0.25s ease-in-out;
  }

  #form-submit:hover {
    background-color: var(--acm-blue);
  }
</style>
