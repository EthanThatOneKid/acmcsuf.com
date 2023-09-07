## Getting started

1. Install [Node.js](https://nodejs.org/en/) (LTS version).
1. Install [Git](https://git-scm.com/downloads).
   - If you are not comfortable with the Git command line tool, you may use GitHub Desktop (<https://desktop.github.com/>). Take a look at <https://acmcsuf.com/1st/> if this is your first time contributing to an open source project.
1. Create a fork of [acmcsuf.com](https://github.com/EthanThatOneKid/acmcsuf.com), similar to <https://github.com/diamondburned/acmcsuf.com>
1. (Optional; required on some pages) Create an [access token](https://scribehow.com/shared/Generating_a_personal_access_token__eMf0UJYaS5OcGrO_lJTpGg).
1. Follow [these instructions](https://github.com/EthanThatOneKid/acmcsuf.com/blob/main/CONTRIBUTING.md#setting-up-your-env-file) to add it to your dev environment.

## Local development setup

1. Create a local clone of your **FORKED** repository.
1. Open a terminal inside your local clone and run `npm i` to install the required dependencies (We use svelte for much of the codebase along with Typescript and some utility libraries).
1. Run `npm start` (or `npm run dev`) to boot up the local development server and navigate to `localhost:5173` in your web browser and you should have a local copy of the website.

## Pushing a code change

1. Create a new branch, **DO NOT** work directly off the main branch.
1. Open `src/routes/+page.svelte`, this is the root of the website, in other words, the front page when you visit the website.
1. Go ahead and change the title of the website to anything you want and head over to `src/routes/hero.svelte` and change the text of the header.
1. Whenever applicable (it’s not in this case), write unit tests for any new functions or components you create.
1. Once you’re satisfied your changes, you **MUST** use `npm run all` to run all tests, lints, and formatting necessary for a release build, otherwise the automated build test will fail.
1. Commit and push your changes.

## Submitting a pull request for review

1. Once you’re ready to submit your changes for review, head back over to the [main repository](https://acmcsuf.com/code) and click on Pull Requests → New pull request.
1. Your pull request should contain.
   1. A clear and descriptive title (Please do not use "Fixed #123").
   1. A clear description that describes, in detail, what you changed and how.
   1. A link to the issue that you resolved (if applicable).
   1. Any screenshots if your change affects something visible on the website or that you believe would help the reviewer understand your changes.
   1. Examples of good PRs:
      1. [https://acmcsuf.com/pull/477](https://github.com/EthanThatOneKid/acmcsuf.com/pull/477)
      1. [https://acmcsuf.com/pull/469](https://github.com/EthanThatOneKid/acmcsuf.com/pull/469)
      1. [https://acmcsuf.com/pull/401](https://github.com/EthanThatOneKid/acmcsuf.com/pull/401)
   1. Examples of bad PRs:
      1. [https://acmcsuf.com/pull/359](https://github.com/EthanThatOneKid/acmcsuf.com/pull/359)
      1. [https://acmcsuf.com/pull/357](https://github.com/EthanThatOneKid/acmcsuf.com/pull/357)
1. Request a code review from someone by first contacting them and then assigning them to your PR using the "Reviewers" panel.
1. Address any feedback from your reviewers if applicable.
1. Once your changes have been approved, you have permission to merge your changes, and your changes should be merged with a **SQUASH** and **NOT** a merge commit.

## Further reading

If you aren’t already familiar with Svelte, you should go through the official [Svelte tutorial](https://svelte.dev/tutorial/basics), as much of the codebase uses it.

Once you’re ready to start, you may either assign yourself to an issue or ask for an issue to be assigned to you. I’d recommend starting with issues tagged [“Good First Issue”](https://github.com/EthanThatOneKid/acmcsuf.com/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).

For a more in depth overview of the codebase, check out [CONTRIBUTING.md](https://github.com/EthanThatOneKid/acmcsuf.com/blob/main/CONTRIBUTING.md) and [ARCHITECTURE.md](https://github.com/EthanThatOneKid/acmcsuf.com/blob/main/ARCHITECTURE.md).
