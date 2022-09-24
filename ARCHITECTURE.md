# Architecture 🗿

This project was created using a library called [SvelteKit][sveltekit_home] which uses [Svelte][svelte_home] to create efficient, static websites.

## `/src/routes/` 📁

The website's pages are located under the [`routes` directory](src/routes).
In that directory, each file with a prefix <kbd>+</kbd> represents an endpoint of the website.

| Path of File                     | Production URL               |
| -------------------------------- | ---------------------------- |
| `/src/routes/+page.svelte`       | `https://acmcsuf.com/`       |
| `/src/routes/about/+page.svelte` | `https://acmcsuf.com/about/` |
| `/src/routes/paths/+page.svelte` | `https://acmcsuf.com/paths/` |

> ℹ more info: <https://kit.svelte.dev/docs/routing#advanced-routing>

### `/src/routes/+layout.svelte` 📄

The [`+layout.svelte file`](src/routes/+layout.svelte) at the root of the `/routes` directory is used in the background of every page of the site.

> ...But in many apps, there are elements that should be visible on every page, such as top-level navigation or a footer. Instead of repeating them in every page, we can use layout components.

Read more about how layouts are used in the [SvelteKit documentation](https://kit.svelte.dev/docs/routing#layout).

### `/src/routes/+error.svelte` 📄

This page is rendered when there are any errors on any page of the website.
If a page on our site cannot render properly due to an error, our site will render this page instead in order to provide the user with any information about the error.
This page should be happy since errors are normally frustrating for users.

> In addition to regular pages, there is a 'special' page that SvelteKit expects to find — `/src/routes/+error.svelte`. This will be shown when an error occurs while rendering a page.

Read more about how error pages are used in the [SvelteKit documentation](https://kit.svelte.dev/docs/routing#error).

## `/src/lib/components/` 📁

Other components of the website can be organized into the [`/lib/components/` directory](src/lib/components).
These files are like pieces of the website that can be composed together in the `/routes` components.
For example, the [`/src/lib/components/footer/footer.svelte`](src/lib/components/footer/footer.svelte) and [`src/lib/components/nav/bar.svelte`](src/lib/components/nav/bar.svelte) components are used in [`/routes/+page.svelte`](src/routes/+page.svelte).

### `/src/lib/components/svg/` 📁

The [`/lib/components/svg/` directory](src/lib/components/svg) contains several Svelte files that contain SVG data.
These icons can be used in the website in multiple places.

## `/static/` 📁

The [`/static` directory](static) contains multiple files that are statically hosted for use on the client.

### `/static/global.css` 📄

The [`global.css`](static/global.css) file is used to supply several _macros_ for us to use anywhere in the site.
This includes some utility classes that help color specific text and some CSS variables that are used to set the font size on every page of the site.
This file is to be amended once in a while as any deletions could cause site-wide issues.
Additions to this file should also be taken with great care as to not complicate the simplicity of our collection of utility classes and CSS variables.

### `/static/assets/` 📁

This directory is used to contain any assets that are used on the client; primarily including images.

#### `/static/assets/authors/` 📁

The [`/static/assets/authors/` directory](static/assets/authors) is home to the normalized headshots of each current acmCSUF board member.
Each board member who is shown in this directory has granted their consent for their image to be public.

#### `/static/assets/png/` 📁

The [`/static/assets/png/` directory](static/assets/png) contains all images and illustrations used on the website that are in the PNG file format.
For visual content in other formats (i.e. SVG), see [`/lib/components/icons`](src/lib/components/icons).

## `tsconfig.json` 📄

The [TSConfig file](tsconfig.json) is used by the TypeScript compiler to specify any compilation parameters and settings.
In the case of this project, our TSConfig is mostly extended from [`@tsconfig/svelte`](https://www.npmjs.com/package/@tsconfig/svelte), an opinionated base TSConfig for working with Svelte.

## `svelte.config.js` 📄

[This file](svelte.config.js) is a configuration file of sorts that handles the bundling and live page reloading when developing the project.

## `.eslintrc.cjs` 📄

[This file](.eslintrc.cjs) is a file that declares the _linting_ configuration of the project.

## `.prettierrc` 📄

[This file](.prettierrc) is a file that declares the _formatting_ configuration of the project.

## `package.json` 📄

[This JSON file](package.json) describes information about the project and stores the information for all of the dependencies (along with their versions) used in the project.
This includes `"dependencies"` that are used inside our program and `"devDependencies"` that are used for development outside of the inner-workings of our program.

## `package-lock.json` 📄

This file is not meant to be modified by humans, but instead left to be managed by the project's package manager, NPM.
Even though it is not affected by developers, the lock file is still important and so it is [_advised_](https://blog.logrocket.com/why-you-should-use-package-lock-json/) to leave it out of the `.gitignore` file.

[sveltekit_home]: https://kit.svelte.dev/
[svelte_home]: https://svelte.dev
[svelte_docs]: https://svelte.dev/docs/
