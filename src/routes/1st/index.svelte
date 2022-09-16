<script context="module">
  const confetti = import.meta.globEager('$lib/1st/confetti/*.ts');
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { Confetti } from 'svelte-confetti';
  import Spacing from '$lib/components/sections/spacing.svelte';

  const colorArray: string[] = Object.keys(confetti).map((key) => confetti[key].default);

  let raining = true;
  let jsEnabled = false;

  async function toggleConfetti() {
    raining = !raining;
  }

  onMount(() => (jsEnabled = true));
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<svelte:head>
  <title>1st Contributions | ACM at CSUF</title>
</svelte:head>

<main class="wrapper">
  <section id="top">
    <div class="header">
      <h1 class="size-lg">
        {#if raining}
          <Confetti
            infinite
            amount="10"
            x={[-0.5, -0.25]}
            y={[0.25, 0.5]}
            delay={[500, 2000]}
            {colorArray}
          />
        {/if}

        First&nbsp;Contributions

        {#if raining}
          <Confetti
            infinite
            amount="10"
            x={[0.25, 0.5]}
            y={[0.25, 0.5]}
            delay={[500, 2000]}
            {colorArray}
          />
        {/if}
      </h1>
    </div>

    <div>
      <button class="confetti-toggle" class:invisible={!jsEnabled} on:click={toggleConfetti}
        >Toggle confetti</button
      >
    </div>

    <p>
      <code>acmcsuf.com/1st</code> aims to simplify and guide the way beginners make their first
      contribution. If you are looking to make your first contribution, follow the steps below. If
      you're not comfortable with command line,
      <a
        href="https://github.com/firstcontributions/first-contributions/blob/main/README.md#tutorials-using-other-tools"
        >here are tutorials using GUI tools</a
      >. If you don't have Git on your machine,
      <a href="https://help.github.com/articles/set-up-git/">install it</a>.
      <br />
      <br />
      Last updated September 9th, 2022
    </p>
  </section>

  <section id="welcome">
    <h2 class="headers">Welcome to ACM!</h2>

    <p>
      ACM at CSUF provides a social online platform, Discord, that brings passionate Titans together
      to engage in multiple conversations regarding our community, the tech field, and many more.
      Join
      <a href="/discord">our Discord server</a> to learn more about future events, meet new people, and
      get involved with the community!
    </p>
  </section>

  <section id="fork">
    <h2 class="headers">Fork <code>acmcsuf.com</code></h2>

    <p dir="auto">
      <img
        src="https://user-images.githubusercontent.com/31261035/190828429-ed3ed214-f63a-442f-9edb-a51bd44f9b1e.png"
        alt="fork this repository"
        style="max-width: 100%;"
      />
    </p>

    <p>
      Fork the repository by clicking on the fork button on the top of <a
        href="https://github.com/ethanthatonekid/acmcsuf.com#readme"
        ><code>acmcsuf.com</code>'s page on GitHub</a
      >. This will create a copy of this repository in your account.
    </p>
  </section>

  <section id="clone">
    <h2 class="headers">Clone the repository</h2>

    <p dir="auto">
      <img
        src="https://user-images.githubusercontent.com/31261035/190828651-d7246405-cbca-4904-9523-fc9262c6dfad.png"
        alt="clone this repository"
        style="max-width: 100%;"
      />
    </p>

    <p dir="auto">
      Now clone the forked repository to your machine. Go to your GitHub account, open the forked
      repository, click on the code button and then click the <em>copy to clipboard</em> icon.
    </p>

    <p dir="auto">
      Open a terminal and run the following git command: <code>git clone "url you just copied"</code
      > where "url you just copied" (without the quotation marks) is the url to this repository (your
      fork of this project). See the previous steps to obtain the url.
    </p>

    <p>
      <img
        width="300"
        src="https://user-images.githubusercontent.com/31261035/190829430-2c4af5f9-ab7f-42f3-9ff3-325abb4b8aac.png"
        alt="copy URL to clipboard"
        style="max-width: 100%;"
      />
    </p>

    <p>For example:</p>
    <pre><code>
git clone https://github.com/this-is-you/acmcsuf.com.git
    </code></pre>
    <p>
      where this-is-you is your GitHub username. Here you're copying the contents of the
      first-contributions repository on GitHub to your computer.
    </p>
  </section>

  <section id="branch">
    <h2 class="headers">Create a branch</h2>

    <p>
      Change to the repository directory on your computer (if you are not already there): <code
        >cd acmcsuf.com</code
      >
      <br />
      Now create a branch using the git switch command:
      <code>git switch -c your-new-branch-name</code>
      <br />
      For example: <code>git switch -c add-ethanthatonekid</code>
    </p>
  </section>

  <section id="changes">
    <h2 class="headers">Make necessary changes and commit them</h2>

    <p class="brand-em">Want to make it rain?</p>

    <br />

    <p>
      Step 1: Add your SVG or PNG in <code>/static/assets/1st/your-new-thing.(svg|png)</code> (See:
      <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes"
        >Basic shapes</a
      >).
      <br />
      Step 2: In a text editor, make some changes by adding some code to show off the new thing you added.
      <code>/src/lib/1st/confetti/your-new-thing.ts</code>, and save it.
    </p>

    <br />

    For example:
    <pre><code>
export default 'url(/assets/1st/your-new-thing.(svg|png))';
    </code></pre>

    <p dir="auto">
      If you go to the project directory and execute the command <code>git status</code>, you'll see
      there are changes.
    </p>

    <p dir="auto">
      Add those changes to the branch you just created using the <code>git add</code> command:
    </p>
    <pre><code>
git add -A && git commit -m "Your Message"
    </code></pre>
  </section>

  <section id="push">
    <h2 class="headers">Push changes to GitHub</h2>

    <p dir="auto">Push your changes using the command <code>git push</code>:</p>

    <pre><code>
git push origin -u <add-your-branch-name /></code
      ></pre>

    <p dir="auto">
      replacing <code>&lt;add-your-branch-name&gt;</code> with the name of the branch you created earlier.
    </p>

    <details>
      <summary> <strong>If you get any errors while pushing, click here:</strong> </summary>
      <ul dir="auto">
        <li>
          <h3 dir="auto">
            <a
              id="user-content-authentication-error"
              class="anchor"
              aria-hidden="true"
              href="#authentication-error"
              ><svg
                class="octicon octicon-link"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
                ><path
                  fill-rule="evenodd"
                  d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                /></svg
              ></a
            >Authentication Error
          </h3>
          <pre>remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
      remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
      fatal: Authentication failed for 'https://github.com//first-contributions.git/'</pre>
          Go to<a
            href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account"
            >GitHub's tutorial</a
          > on generating and configuring an SSH key to your account.
        </li>
      </ul>
    </details>
  </section>

  <section id="review">
    <h2 class="headers">Submit your changes for review</h2>

    <p dir="auto">
      If you go to your repository on GitHub, you'll see a <code>Compare &amp; pull request</code> button.
      Click on that button.
    </p>

    <p>
      <img
        src="https://camo.githubusercontent.com/ca3b1cefece5f3b9b3435020e6a357ca024cda5bd2b1e140a15170fcd1ec5381/68747470733a2f2f6669727374636f6e747269627574696f6e732e6769746875622e696f2f6173736574732f526561646d652f636f6d706172652d616e642d70756c6c2e706e67"
        alt="create a pull request"
        data-canonical-src="https://firstcontributions.github.io/assets/Readme/compare-and-pull.png"
        style="max-width: 100%;"
      />
    </p>

    <p dir="auto">Now submit the pull request.</p>

    <p>
      <img
        src="https://camo.githubusercontent.com/71401ba5551a64aeac3838825a52ce7a7597cd8b54a0d7200d9454e2cbfbb13f/68747470733a2f2f6669727374636f6e747269627574696f6e732e6769746875622e696f2f6173736574732f526561646d652f7375626d69742d70756c6c2d726571756573742e706e67"
        alt="submit pull request"
        data-canonical-src="https://firstcontributions.github.io/assets/Readme/submit-pull-request.png"
        style="max-width: 100%;"
      />
    </p>

    <p dir="auto">
      Soon, someone will be merging all your changes into the master branch of this project. You
      will get a notification email once the changes have been merged.
    </p>

    <hr />

    <p dir="auto" class="brand-em">CONGRATULATIONS ON MAKING YOUR FIRST CONTRIUBUTION</p>

    <p>
      Inspired by <a href="https://github.com/firstcontributions/first-contributions#readme"
        >First Contributions</a
      >
    </p>
  </section>
</main>

<Spacing --min="40px" --med="95px" --max="120px" />

<style lang="scss">
  .responsive-width {
    width: min(800px, 80vw);
  }

  :global(.header svg) {
    width: 100%;
    height: 5px;
  }

  .wrapper {
    max-width: 540px;
    margin: 0 auto;
    padding: 0 1rem 6rem;
  }

  h1 {
    display: flex;
    align-items: center;
    margin: 0;
    color: var(--text-color-lightest);
  }

  .invisible {
    visibility: hidden;
  }

  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    code {
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    section {
      width: min(800px, 80vw);
      max-width: 540px;
      margin: 0 auto;
      // padding: 0 1rem 6rem;
      margin-bottom: 50px;

      h2 {
        padding-bottom: 1em;
      }

      hr,
      p {
        margin: 1em 0;
      }

      a {
        transition: 0.25s ease-in-out;

        &:hover {
          color: var(--acm-blue);
        }
      }
    }
  }

  .confetti-toggle {
    background: none;
    border: var(--acm-dark) 3px solid;
    border-radius: 18px;
    padding: 4px 8px;
    transition: 0.25s ease-in-out;
  }

  .confetti-toggle:hover {
    box-shadow: 0px 0px 4px var(--acm-dark);
  }
</style>
