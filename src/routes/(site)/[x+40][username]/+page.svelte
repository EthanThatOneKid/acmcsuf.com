<script lang="ts">
  import type { PageData } from './$types';
  import { MetaTags } from 'svelte-meta-tags';
  import { page } from '$app/stores';

  import Spacing from '$lib/public/legacy/spacing.svelte';
  import { makeCertificatePageUrl } from '$lib/public/certificates';

  export let data: PageData;

  const pageTitle = `${data.certificate.to.tagName} acmcsuf.com contributions | ${data.certificate.user.name}`;

  function makeDescription(cert: PageData['certificate']): string {
    const { user, to, merged } = cert;
    const { name, login } = user;
    const { tagName } = to;

    const contributions =
      merged.length > 0
        ? `made ${merged.length} contribution${merged.length > 1 ? 's' : ''}`
        : 'did not make a contribution';

    return `${name} (${login}) ${contributions} in the ${tagName} release!`;
  }
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<MetaTags
  openGraph={{
    title: `${data.certificate.to.tagName} acmcsuf.com contributions | ${data.certificate.user.name}`,
    description: makeDescription(data.certificate),
    images: [
      {
        url: new URL(data.certificate.user.picture, $page.url).toString(),
        width: 80,
        height: 80,
        alt: `${data.certificate.user.name}'s picture`,
      },
    ],
  }}
/>

<Spacing --min="100px" --med="120px" --max="125px" />

<article>
  <Spacing --min="16px" --med="16px" --max="16px" />

  <img src={data.certificate.user.picture} alt={`${data.certificate.user.name}'s picture`} />

  <Spacing --min="16px" --med="16px" --max="16px" />

  <h1 class="size-l toplevel-text headers">
    <a
      class="username"
      href={`https://github.com/${data.certificate.user.login}`}
      target="_blank"
      rel="noopener noreferrer">{data.certificate.user.name}</a
    >
    {#if data.certificate.merged.length > 0}
      made {data.certificate.merged.length} contribution{data.certificate.merged.length > 1
        ? 's'
        : ''}
    {:else}
      did not make a contribution
    {/if}
    in the
    <a
      href={`https://github.com/EthanThatOneKid/acmcsuf.com/releases/tag/${data.certificate.to.tagName}`}
      target="_blank"
      rel="noopener noreferrer">{data.certificate.to.tagName}</a
    >
    release{#if data.certificate.merged.length === 0}, but they might have made contributions in
      another release{/if}!
  </h1>

  <Spacing --min="40px" --med="40px" --max="40px" />

  <div class="toplevel-text">
    {@html data.certificate.user.bio}
  </div>

  <Spacing --min="40px" --med="40px" --max="40px" />

  <div class="container">
    <ol>
      {#each data.certificate.merged as pr}
        <li>
          <a href={pr.url} target="_blank" rel="noopener noreferrer">
            <b>#{pr.number}</b>
            {@html pr.title}
          </a>
          <details>
            <summary>
              {pr.commits.length} commit{pr.commits.length > 1 ? 's' : ''}
              {#if pr.commits.length >= 100}
                (showing first 100... <a href={pr.url} target="_blank" rel="noopener noreferrer"
                  >view all</a
                >)
              {:else}
                (expand)
              {/if}
            </summary>

            <ol>
              {#each pr.commits as commit}
                <li>
                  <a href={commit.url} target="_blank" rel="noopener noreferrer">
                    {@html commit.message}
                  </a>
                </li>
              {/each}
            </ol>
          </details>
        </li>
      {/each}
    </ol>
  </div>

  <Spacing --min="20px" --med="20px" --max="20px" />

  <h2 class="size-l toplevel-text">Select a different release:</h2>

  <ul class="releases">
    {#each data.releases as release, i}
      <li>
        {#if release.tagName === data.certificate.to.tagName}
          <b>{release.tagName}</b> ({i === 0 ? 'latest' : 'previous'})
        {:else}
          <a
            href={makeCertificatePageUrl(data.certificate.user.login, release.tagName)}
            data-sveltekit-preload-data="hover">{release.tagName}</a
          >
        {/if}
      </li>
    {/each}
  </ul>

  <Spacing --min="40px" --med="40px" --max="40px" />
</article>

<style lang="scss">
  article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100%;

    .username {
      text-decoration: underline;
    }

    .toplevel-text {
      margin: 0 3rem;
    }

    a {
      text-decoration: none;
      font-weight: 500;
      transition: 0.25s ease-in-out;

      &:hover {
        b {
          text-decoration: underline;
        }
        color: var(--acm-blue);
      }
    }
  }

  .releases {
    display: flex;
    flex-direction: column;
    text-align: center;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin: 0 8px;
      padding: 1rem 0;
      border-bottom: 7px solid #eaeaea;
      width: 100%;
    }

    li:has(a:hover) {
      border-bottom: 7px solid var(--acm-blue);
    }

    b {
      color: var(--acm-blue);
    }
  }

  .container {
    margin: 0 3rem;

    ol {
      padding: 0;
      margin: 0;
    }

    li {
      margin: 1rem 0;
      padding: 0;

      details {
        margin: 0 1.5rem;
        padding: 0;
        border: none;
        outline: none;
        color: #eaeaea;
        cursor: pointer;

        summary {
          margin: 0 -1rem;
          padding: 0;
          border: none;
          outline: none;
          list-style: none;
          font-size: 0.9em;
          font-weight: 400;
          line-height: 1.5em;
          cursor: pointer;
          transition: 0.25s ease-in-out;

          &:hover {
            color: var(--acm-blue);
          }

          &:focus {
            color: var(--acm-blue);
          }

          &[open] {
            color: var(--acm-blue);
          }
        }

        ol {
          padding: 0;
          margin: 0 0 0 1em;
          font-size: var(--size-xs);
        }

        li {
          margin: 0 0 1em;
          padding: 0;
        }
      }
    }
  }

  img {
    height: 100%;
    width: 12em;
    border-radius: 50%;
  }

  @media (min-width: 768px) {
    article {
      max-width: 500px;
    }

    .toplevel-text {
      margin: 0 1em;
    }
  }

  :global(main) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
</style>
