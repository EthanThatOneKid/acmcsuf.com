# [`acmcsuf.com`][demo_url] 🐘

> Official website of CSUF's ACM club.

## Develop [👩‍💻][figma_design]

> 💡 This project runs on NodeJS; [install the latest long-term support version][node_download].

To get started, clone this repository to your machine and run `npm i` in the root of this project.
Then, run `npm run dev` to spin up the [development server][dev_server].

## Deployment 🚀

Whenever a release is cut (by creating a tag), a [GitHub action][github_action_deploy] is invoked. It builds the site, tests it, and if there are no errors, it will deploy to [Netlify][netlify_dashboard].

---

Maintained with 💖 by [Ethan Davidson][webmaster_url] (`EthanThatOneKid#3456`) and [ACM CSUF][acm_officers]

[node_download]: https://nodejs.org/en/download/
[github_action_deploy]: .github/workflows/deploy.yaml
[demo_url]: https://acmcsuf.com/
[acm_officers]: https://acmcsuf.com/about/
[webmaster_url]: https://github.com/EthanThatOneKid/
[figma_design]: https://www.figma.com/file/9cvuO69WgNGuCjf2JGDPfq/ACM-Website-Mockup---Mike-Ploythai?node-id=1%3A26
[dev_server]: http://localhost:3000/
[netlify_dashboard]: http://netlify.com/