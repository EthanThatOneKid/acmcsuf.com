# Contributing 🤝

## Getting Started 🦕

Getting started with this project is quite simple.
There really are only a handful of simple steps.

1. Make sure Node.js is installed on your machine.
1. Clone the repository.
1. Install the dependencies and contribute.

First, make sure that Node.js is **installed** on your machine in order to run our code.
If you do not have Node.js installed, visit their [downloads page][node_dl] and install the latest long-term supported version.

To contribute to this project, you may simply begin by **cloning** this repository to your machine.
Clone this repository by [directly downloading it][ddl] or via git: `git clone https://github.com/EthanThatOneKid/acmcsuf.com.git`.

Open the repository in your code editor or terminal of choice and enter `npm i` to **install** the project's dependencies.
After that, enter `npm run dev` to spin up the development server.
As the development server is running, open up [`http://localhost:3000/`](http://localhost:3000/).
Every update made to the source code will trigger your `http://localhost:3000/` page to reload automatically.

Now that you've got everything up-and-running, you are free to contribute to your heart's content.

## Architecture 🗿

For architecture-related information, please refer to [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Svelte File Structure 📄

Svelte files can be written as if it were an HTML file.
Writing only `<h1>Hello, world!</h1>` in a Svelte file is valid, however, Svelte gives you access to some handy built-in superpowers that simplify development tremendously (See the [Svelte docs][svelte_docs] for further information).
Additionally, check out this YouTube video, [_Svelte in 100 Seconds_](https://youtu.be/rv3Yq-B8qp4) by [**@fireship-io**](https://github.com/fireship-io).

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
@media screen and (min-width: 768px) { /* styles here */ }
```

Notice that the value `768px` is constant.
The next most common breakpoint for larger desktop screens would be `1440px`.
Really, the situation may affect your choice of breakpoint value, but the goal is to try to use only `768px` or `1440px` wherever possible for consistency-purposes.

## Webmaster's Note 📝

Thank you for contributing!
The time spent reading this deserves a pat on the back and even a hydration/stretch break.

[ddl]: https://github.com/EthanThatOneKid/acmcsuf.com/archive/main.zip
[node_dl]: https://nodejs.org/en/download/
[sapper_home]: https://sapper.svelte.dev/
[svelte_home]: https://svelte.dev/
[svelte_docs]: https://svelte.dev/docs/
[mobile_first_info]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first
[svelte_sort_order]: https://github.com/sveltejs/prettier-plugin-svelte#svelte-sort-order
