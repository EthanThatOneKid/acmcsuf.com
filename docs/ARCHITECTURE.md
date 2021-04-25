# Architecture 🗿

This project was created using a library called [Sapper][sapper_home] which uses [Svelte][svelte_home] to create efficient, static websites.

## `/src/routes` 📁

The website's pages are located under the [`routes` directory](../src/routes).
In that directory, each file represents one page of the website.

| Path of File                     | Production URL               |
| -------------------------------- | ---------------------------- |
| `/src/routes/index.svelte`       | `https://acmcsuf.com/`       |
| `/src/routes/about.svelte`       | `https://acmcsuf.com/about/` |
| `/src/routes/paths/index.svelte` | `https://acmcsuf.com/paths/` |

### `/src/routes/_layout.svelte` 📄

The [`_layout.svelte file`](../src/routes/_layout.svelte) at the root of the `/routes` directory is used in the background of every page of the site.

> ...But in many apps, there are elements that should be visible on every page, such as top-level navigation or a footer. Instead of repeating them in every page, we can use layout components.

Read more about how layouts are used in the [Sapper documentation](https://sapper.svelte.dev/docs#Layouts).

### `/src/routes/_error.svelte` 📄

This page is rendered when there are any errors on any page of the website.
If a page on our site cannot render properly due to an error, our site will render this page instead in order to provide the user with any information about the error.
This page should be happy since errors are normally frustrating for users.

> In addition to regular pages, there is a 'special' page that Sapper expects to find — src/routes/_error.svelte. This will be shown when an error occurs while rendering a page.

Read more about how error pages are used in the [Sapper documentation](https://sapper.svelte.dev/docs#Error_page).

## `/src/components` 📁

Other components of the website can be organized into the [`/components` directory](../src/components).
These files are like pieces of the website that can be composed together in the `/routes` components.
For example, the [`/components/index/hero.svelte`](../src/components/index/hero.svelte) and [`/components/index/acm-paths.svelte`](../src/components/index/acm-paths.svelte) components are used in [`/routes/index.svelte`](../src/routes/index.svelte).

If you take a look at the [`components` directory](../src/components), you will find a list of several more directories within.
Most of these directories share the name of a route in the [`/routes` directory](../src/routes).
For example, all components under [`/components/events`](../src/components/events) are used in the `/events` route of the website.
Additionally, all components under [`/components/index`](../src/components/index) are used in the `/` route.

### `/src/components/utils` 📁

There are a couple of directories in the components directory that do not fit the `/components/[route_name]/[component_name].svelte` pattern.
One of them is the [`/components/utils` directory](../src/components/utils).
This directory contains utility components that are used by multiple routes.
This includes `acm-button.svelte` and `acm-select.svelte`, for example.

### `/src/components/icons` 📁

The [`/components/icons` directory](../src/components/icons) contains several Svelte files that contain SVG data.
These icons can be used in the website in multiple places.

## `/static` 📁

The [`/static` directory](../static) contains multiple files that are statically hosted for use on the client.

### `/static/global.css` 📄

The [`global.css`](../static/global.css) file is used to supply several _macros_ for us to use anywhere in the site.
This includes some utility classes that help color specific text and some CSS variables that are used to set the font size on every page of the site.
This file is to be amended once in a while as any deletions could cause site-wide issues.
Additions to this file should also be taken with great care as to not complicate the simplicity of our collection of utility classes and CSS variables.

### `/static/assets` 📁

This directory is used to contain any assets that are used on the client; primarily including images.

#### `/static/assets/authors` 📁

The [`/static/assets/authors` directory](../static/assets/authors) is home to the normalized headshots of each current acmCSUF board member.
Each board member who is shown in this directory has granted their consent for their image to be public.

#### `/static/assets/png` 📁

The [`/static/assets/png` directory](../static/assets/png) contains all images and illustrations used on the website that are in the PNG file format.
For visual content in other formats (i.e. SVG), see [`/components/icons`](../src/components/icons).

## `tsconfig.json` 📄

The [TSConfig file](../tsconfig.json) is used by the TypeScript compiler to specify any compilation parameters and settings.
In the case of this project, our TSConfig is mostly extended from [`@tsconfig/svelte`](https://www.npmjs.com/package/@tsconfig/svelte), an opinionated base TSConfig for working with Svelte.

## `rollup.config.js` 📄

[This file](../rollup.config.js) is a configuration file of sorts that handles the bundling and live page reloading when developing the project.
Our particular file was originally copied over from the Sapper project template.

## `.eslintrc.js` 📄

[This file](../.eslintrc.js) is a file that declares the _linting_ configuration of the project.

## `.prettier.js` 📄

[This file](../.prettier.js) is a file that declares the _formatting_ configuration of the project.

## `package.json` 📄

[This JSON file](../package.json) describes information about the project and stores the information for all of the dependencies (along with their versions) used in the project.
This includes `"dependencies"` that are used inside our program and `"devDependencies"` that are used for development outside of the inner-workings of our program.

## `package-lock.json` 📄

This file is not meant to be modified by humans, but instead left to be managed by the project's package manager, NPM.
Even though it is not affected by developers, the lock file is still important and so it is advised to leave it out of the `.gitignore` file.

[sapper_home]: https://sapper.svelte.dev/
[svelte_home]: https://svelte.dev
[svelte_docs]: https://svelte.dev/docs/