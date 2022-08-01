# Contributing 🤝

## Getting Started 🦕

Getting started with this project is similar to any other Node.js project.
There really are only a handful of simple steps.

1. Make sure [Node.js is installed][node_dl] on your machine.
1. Clone the repository.
1. Install the dependencies and contribute.

First, make sure that Node.js is **installed** on your machine in order to run our code.
If you do not have Node.js installed, visit their [downloads page][node_dl] and install the latest long-term supported version.

To contribute to this project, you may simply begin by **cloning** this repository to your machine.
Clone this repository by [directly downloading it][ddl] or via git: `git clone https://github.com/ethanthatonekid/acmcsuf.com.git`.

Open the repository in your code editor or terminal of choice and enter `npm i` to **install** the project's dependencies.
After that, enter `npm run dev` to spin up the development server.
As the development server is running, open up [`http://localhost:3000/`](http://localhost:3000/).
Every update made to the source code will trigger your `http://localhost:3000/` page to reload automatically.

Now that you've got everything up-and-running, you are free to contribute to your heart's content.

## Submitting your own Contributions 🎉

Before publishing a PR, it is required that you run `npm run release` to make sure that you are complying with our style guidelines and passing all checks.

```bash
# Runs the autoformatter, WARNING: this might mutate your files.
npm run format
# Runs the linter, WARNING: this might mutate your files.
npm run lint
# Runs the checks for type errors, unused css, and more (See: https://github.com/sveltejs/language-tools/tree/master/packages/svelte-check)
npm run check
# Run all our unit tests (or with `npm t`)
npm run test
# Builds the website
npm run build


# Runs all of the above checks necessary for a release deployment
npm run release

# Runs the above and hosts the production version locally
npm run host

# Runs all our unit tests and generates a code coverage report
npm run test:coverage
```

### NPM Bloat

In this project, we set a threshold for how large the `/node_modules` folder can become after an `npm install`.
In our [`package.json`](package.json), we set the size to 50 MB.

To test the size of the dependencies in your local workspace, run `npm run test:size`.

## Architecture 🗿

For architecture-related information, please refer to [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Svelte File Structure 📄

Svelte files can be written as if it were an HTML file.
Writing only `<h1>Hello, world!</h1>` in a Svelte file is valid, however, Svelte gives you access to some handy built-in superpowers that simplify development tremendously (See the [Svelte docs][svelte_docs] for further information).
Additionally, check out this YouTube video, [_Svelte in 100 Seconds_](https://youtu.be/rv3Yq-B8qp4) by [**@fireship-io**](https://github.com/fireship-io).
For quick reference, check out <https://svelte.dev/tutorial/basics>.

In addition to HTML markup, Svelte files consist of two other sections: _script_ and _styles_.

> 💡 Note: It is convention to [order your sections][svelte_sort_order] like so: `script-markup-styles`.

### `<script>` 👨‍💻

The script section of a Svelte file just contains Type/JavaScript code.
Mainly, it allows you to import helper components, declare element properties, and pretty much anything else that your mind can imagine (within the limitations of JavaScript).

### `<styles>` 💅

The styles section of a Svelte file contains CSS code.
Use this section to style to HTML that exists in the same file.

This project takes a [mobile-first][mobile_first_info] approach to styling.
This means that the stylesheet accommodates for mobile dimensions by default.
So, to update the styling for desktop sizes, overwrite your styles inside the following media query:

```css
@media screen and (min-width: 768px) {
  /* styles here */
}
```

Notice that the value `768px` is constant.
The next most common breakpoint for larger desktop screens would be `1440px`.
Really, the situation may affect your choice of breakpoint value, but the goal is to try to use only `768px` or `1440px` wherever possible for consistency-purposes.

## Setting up your `.env` file

To interact with data from GitHub (or any third-party service), a file named `.env` must be created in the root of your local repository instance.

Some environment variables are necessary to gain access to data from third-party services.
We use the `VITE_GH_ACCESS_TOKEN` environment variable to authenticate our requests to GitHub (and [prevent rate limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#increasing-the-unauthenticated-rate-limit-for-oauth-apps)).
Below is how `VITE_GH_ACCESS_TOKEN` should be defined in your `.env` file, where `YOUR_PAT` should be replaced with your own generated [personal GitHub access token](https://github.com/settings/tokens).

```sh
VITE_GH_ACCESS_TOKEN=YOUR_PAT
```

**Fair Warning**: Never commit your _PAT_ (or any sensitive information) in files that are not ignored by our [`.gitignore`](https://github.com/EthanThatOneKid/acmcsuf.com/blob/main/.gitignore) file (`.env` being one of them).

Other environment variables are needed to provide information that allows the program to fetch data from the correct place. It is okay to copy and paste the additional variables into your `.env` file as defined below because they are already public.

```sh
# General discussion on GitHub: <https://github.com/EthanThatOneKid/acmcsuf.com/discussions/categories/newsletter>
VITE_GH_DISCUSSION_CATEGORY_ID=DIC_kwDOE7ysSc4CAC0o

# Algo discussion on GitHub: <https://github.com/EthanThatOneKid/acmcsuf.com/discussions/categories/algo>
VITE_GH_ALGO_CATEGORY_ID=DIC_kwDOE7ysSc4COe-m

# Switch to 1 to turn on debug mode.
VITE_DEBUG=0
```

Some environment variables are needed to run scripts that are used for purposes indirectly related to `acmcsuf.com` (such as the Gitcord scripts).

```sh
DISCORD_BOT_TOKEN=YOUR_BOT_TOKEN
GUILD_ID=YOUR_GUILD_ID
HUB_ID=YOUR_HUB_CHANNEL_ID
ARCHIVE_CHANNEL_ID=YOUR_ARCHIVE_CHANNEL_ID
```

## Custom Workflows

In this repository, we use GitHub Actions to _automate all the things_ 😎

### Creating an Officer Update Request

To update the way an officer appears on <https://acmcsuf.com/about>, contributors may fill out our [**Officer Update Request Form**](https://github.com/EthanThatOneKid/acmcsuf.com/issues/new?assignees=&labels=automation%3Aofficer&template=officer_update_request.yaml&title=%5BOFFICER_AUTOMATION%5D) ([source](https://github.com/EthanThatOneKid/acmcsuf.com/blob/main/.github/ISSUE_TEMPLATE/officer_update_request.yaml)) to automate a pull request with the requested changes.

A contributor is able to update an acmCSUF officer's image by simply opening a new [**Officer Update Request Form**](https://github.com/EthanThatOneKid/acmcsuf.com/issues/new?assignees=&labels=automation%3Aofficer&template=officer_update_request.yaml&title=%5BOFFICER_AUTOMATION%5D) and pasting the updated officer image into the provided textarea.

A contributor is also able to update the position title of an acmCSUF officer for a given _term_ (e.g. Fall 2021, Spring 2022, etc.).

Finally, contributors can also remove an officer from the officers list by typing `DELETE` into the _Overwrite Officer Position Title_ field.

Once a contributor has submitted the issue form, a new PR should be available momentarily for preview.
Contributors are free to merge the auto-generated pull request if it seems to have made the intended changes.

#### How it Works

The [`workflows/update_officer.yaml`](https://github.com/EthanThatOneKid/acmcsuf.com/blob/main/.github/workflows/update_officer.yaml) workflow configuration automates each time an issue is opened with the `automation:officer` label.
This workflow relies on [`scripts/update-officer.js`](https://github.com/EthanThatOneKid/acmcsuf.com/blob/main/scripts/update-officer.js) to make the appropriate changes to the checked-out codebase (including updating the repo's `officers.json` file or adding/replacing their image in the repo's `/static/assets/authors/` directory).
Then, the workflow generates a pull request based on the changes made by the `update-officer.js` script and immediately closes the issue.

### Automated Third-Party Message Board

Our team uses Discord as our third-party messaging service of choice to discuss relevant topics that aren't suited/ready for GitHub.
We have text channels set up on Discord dedicated to every open issue on GitHub.
This approach allows us to communicate about multiple issues in an orderly and stress-free fashion.

Manually creating and closing text channels for every single GitHub issue is not an appropriate solution to this problem since the text channels will eventually become stale.
We also want a way to archive these discussions without cluttering the Discord server with text channels.
To accomplish these needs, we need a way to automate those tasks whenever an issue is created or closed on this GitHub repository.

The [`workflows/create_issue_channel.yaml`](https://github.com/EthanThatOneKid/acmcsuf.com/blob/main/.github/workflows/create_issue_channel.yaml) workflow is responsible for creating a new text channel whenever an issue is opened [or reopened] on Github.
This workflow relies on [`scripts/create-issue-channel.js`](https://github.com/EthanThatOneKid/acmcsuf.com/blob/main/scripts/create-issue-channel.js) to create the text channel and send the first message containing a link to the newly created issue.

The [`workflows/close_issue_channel.yaml`](https://github.com/EthanThatOneKid/acmcsuf.com/blob/main/.github/workflows/close_issue_channel.yaml) workflow is responsible for closing a text channel whenever a corresponding issue is closed [or deleted] on Github.
This workflow relies on [`scripts/close-issue-channel.js`](https://github.com/EthanThatOneKid/acmcsuf.com/blob/main/scripts/close-issue-channel.js) to transcribe the old issue channel's messages to a dedicated _archive_ channel and then delete the old channel.

## Webmaster's Note 📝

Thank you for contributing!
The time spent reading this deserves a pat on the back and even a hydration/stretch break.
Up next, read [`ARCHITECTURE.md`](ARCHITECTURE.md)!

[ddl]: https://etok.codes/acmcsuf.com/archive/main.zip
[node_dl]: https://nodejs.org/en/download/
[svelte_home]: https://svelte.dev/
[svelte_docs]: https://svelte.dev/docs/
[mobile_first_info]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first
[svelte_sort_order]: https://github.com/sveltejs/prettier-plugin-svelte#svelte-sort-order
