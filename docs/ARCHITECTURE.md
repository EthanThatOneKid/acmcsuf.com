# Architecture 🗿

This project was created using a library called [Sapper][sapper_home] which uses [Svelte][svelte_home] to create efficient, static websites.

## `routes` 📁

The website's pages are located under the [`routes` directory](../src/routes).
In that directory, each file represents one page of the website.

| Path of File                     | Production URL               |
| -------------------------------- | ---------------------------- |
| `/src/routes/index.svelte`       | `https://acmcsuf.com/`       |
| `/src/routes/about.svelte`       | `https://acmcsuf.com/about/` |
| `/src/routes/paths/index.svelte` | `https://acmcsuf.com/paths/` |

## `components` 📁

Other components of the website can be organized into the [`components` directory](../src/components).
These files are like pieces of the website that can be composed together.
For example, the [`sections/navbar.svelte`](../src/components/sections/navbar.svelte) and [`sections/footer.svelte`](../src/components/sections/footer.svelte) components are used in [`_layout.svelte`](../src/routes/_layout.svelte).

## Svelte File Structure 📄

Svelte files can be written as if it were an HTML file.
Writing only `<h1>Hello, world!</h1>` in a Svelte file is valid, however, Svelte gives you access to some handy built-in superpowers that simplify development tremendously (See the [Svelte docs][svelte_docs] for further information).

In addition to HTML markup, Svelte files consist of two other sections: _script_ and _styles_.

> 💡 Note: It is convention to order your sections like so: `script-markup-styles`.

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

[sapper_home]: https://sapper.svelte.dev/
[svelte_home]: https://svelte.dev
[svelte_docs]: https://svelte.dev/docs/
[mobile_first_info]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first
