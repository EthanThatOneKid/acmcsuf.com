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

[sapper_home]: https://sapper.svelte.dev/
[svelte_home]: https://svelte.dev
[svelte_docs]: https://svelte.dev/docs/