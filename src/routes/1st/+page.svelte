<script context="module" lang="ts">
  const confetti: Record<string, { default: string }> = import.meta.globEager(
    '$lib/1st/confetti/*.ts'
  );
</script>

<script lang="ts">
  import { Confetti } from 'svelte-confetti';
  import Spacing from '$lib/public/legacy/spacing.svelte';

  const colorArray = Object.keys(confetti).map((key) => confetti[key].default);
</script>

<Spacing --min="175px" --med="200px" --max="200px" />

<svelte:head>
  <title>1st Contributions | ACM at CSUF</title>
</svelte:head>

<main class="responsive-width">
  <div class="confetti-wrapper">
    <Confetti
      x={[-5, 5]}
      y={[0, 0.1]}
      delay={[500, 2000]}
      infinite
      duration="5000"
      amount="200"
      fallDistance="100vh"
      {colorArray}
    />
  </div>

  <section id="top">
    <div class="header">
      <h1 class="size-lg">First Contributions</h1>
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

    <p>
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

    <p>
      <img
        src="https://user-images.githubusercontent.com/31261035/190828651-d7246405-cbca-4904-9523-fc9262c6dfad.png"
        alt="clone this repository"
        style="max-width: 100%;"
      />
    </p>

    <p>
      Now clone the forked repository to your machine. Go to your GitHub account, open the forked
      repository, click on the code button and then click the <em>copy to clipboard</em> icon.
    </p>

    <p>
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

    <p>
      If you go to the project directory and execute the command <code>git status</code>, you'll see
      there are changes.
    </p>

    <p>
      Add those changes to the branch you just created using the <code>git add</code> command:
    </p>
    <pre><code>
git add -A && git commit -m "Your Message"
    </code></pre>
  </section>

  <section id="push">
    <h2 class="headers">Push changes to GitHub</h2>

    <p>Push your changes using the command <code>git push</code>:</p>

    <pre><code>git push origin -u add-your-branch-name</code></pre>

    <p>
      replacing <code>&lt;add-your-branch-name&gt;</code> with the name of the branch you created earlier.
    </p>
  </section>

  <section id="review">
    <h2 class="headers">Submit your changes for review</h2>

    <p>
      If you go to your repository on GitHub, you'll see a <code>Compare &amp; pull request</code> button.
      Click on that button.
    </p>

    <p>
      <img
        src="https://user-images.githubusercontent.com/31261035/190830317-077f7a1e-1ae3-4686-bf79-09928e509ccc.png"
        alt="create a pull request"
        style="max-width: 100%;"
      />
    </p>

    <p>Now submit the pull request.</p>

    <p>
      <img
        src="https://user-images.githubusercontent.com/31261035/190830699-c684751a-df82-4da4-822d-d21bd84a8e43.png"
        alt="submit pull request"
        style="max-width: 100%;"
      />
    </p>

    <p>
      Soon, someone will be merging all your changes into the master branch of this project. You
      will get a notification email once the changes have been merged.
    </p>

    <hr />

    <p class="brand-em">CONGRATULATIONS ON MAKING YOUR FIRST CONTRIUBUTION</p>

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
    max-width: 540px;
    margin: 0 auto;
  }

  .confetti-wrapper {
    position: absolute;
    overflow-x: hidden;
    top: -50px;
    left: 0;
    right: 0;
    height: 70vh;
    width: 75vw;
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin: 0 auto;
  }

  :global(.header svg) {
    width: 100%;
    height: 5vh;
  }

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
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
</style>
