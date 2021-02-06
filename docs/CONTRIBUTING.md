# Contributing

To contribute to this project, you may simply begin by cloning this repository to your machine.
Clone this repository by [directly downloading it][ddl] or via git: `git clone https://github.com/EthanThatOneKid/acmcsuf.com.git`.

## Getting Started

### Architecture

This project was created using a library called [Sapper][sapper_home] which uses [Svelte][svelte_home] to create efficient, static websites.

#### `routes`

The website's pages are located under the [`routes` directory](../src/routes).
In that directory, every file represents one page of the website.

| Path of File                     | Production URL               |
| -------------------------------- | ---------------------------- |
| `/src/routes/index.svelte`       | `https://acmcsuf.com/`       |
| `/src/routes/about/index.svelte` | `https://acmcsuf.com/about/` |
| `/src/routes/paths/index.svelte` | `https://acmcsuf.com/paths/` |

#### `components`

Other components of the website can be organized into the [`components` directory](../src/components).
These files are like pieces of the website that can be composed together.
For example, the [`sections/navbar.svelte`](../src/components/sections/navbar.svelte) and [`sections/footer.svelte`](../src/components/sections/footer.svelte) components are used in [`_layout.svelte`](../src/routes/_layout.svelte).

#### Svelte File Structure

Svelte files can be written as if it were an HTML file.
Writing only `<h1>Hello, world!</h1>` in a Svelte file is valid, however, Svelte gives you access to some handy built-in superpowers that simplifies development tremendously.

In addition to HTML markup, Svelte files consist of two other sections: _script_ and _styles_.

> 💡 Note: It is convention to order your sections like so: `script-markup-styles`.

##### `<script>`

The script section of a Svelte file just contains Type/JavaScript code.
Mainly, it allows you to import helper components, declare element properties, and pretty much anything else that your mind can imagine (within the limitations of JavaScript).

##### `<styles>`

The styles section of a Svelte file contains CSS code.
Use this section to style to HTML that exists in the same file.

## Webmaster's Note

Thank you for contributing!
The time spent reading this deserves a pat on the back and even a hydration/stretch break.

[ddl]: https://github.com/EthanThatOneKid/acmcsuf.com/archive/main.zip
[sapper_home]: https://sapper.svelte.dev/
[svelte_home]: https://svelte.dev/
