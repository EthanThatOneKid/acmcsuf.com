<script lang="ts">
  import type { PageData } from './$types';
  import { MetaTags } from 'svelte-meta-tags';
  // import Select from '$lib/components/select/select.svelte';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import { makeCertificatePageUrl } from '$lib/public/certificates';

  export let data: PageData;
</script>

<svelte:head>
  <title>@{data.certificate.user.login}'s {data.certificate.to.tagName} contributions</title>
</svelte:head>

<MetaTags
  openGraph={{
    title: `@${data.certificate.user.login}'s ${data.certificate.to.tagName} contributions`,
    images: [
      {
        url: data.certificate.user.picture,
        width: 80,
        height: 80,
        alt: `${data.certificate.user.name}'s picture`,
      },
    ],
  }}
/>

<Spacing --min="175px" --med="200px" --max="200px" />

<section>
  <Spacing --min="16px" --med="16px" --max="16px" />

  <img src={data.certificate.user.picture} alt={`${data.certificate.user.name}'s picture`} />

  <Spacing --min="16px" --med="16px" --max="16px" />

  <h1 class="size-xl">
    Congratulations to
    {data.certificate.user.name}
    (<a
      href={`https://github.com/${data.certificate.user.login}`}
      target="_blank"
      rel="noopener noreferrer">@{data.certificate.user.login}</a
    >) for contributing to the acmcsuf.com
    {data.certificate.to.tagName}
    release!
  </h1>

  <Spacing --min="40px" --med="40px" --max="40px" />

  <p>
    {data.certificate.user.bio}
  </p>

  <Spacing --min="40px" --med="40px" --max="40px" />

  <h2 class="size-l">Select a different release</h2>

  <ul>
    {#each data.releases as release}
      <li>
        {#if release.tagName === data.certificate.to.tagName}
          <b>{release.tagName}</b> (current)
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

  <div class="container">
    <h1 class="size-xl">
      Your {data.certificate.merged.length} contributions in {data.certificate.to.tagName}
    </h1>

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
              {#if pr.commits.length >= 30}
                (showing first 100... <a href={pr.url} target="_blank" rel="noopener noreferrer"
                  >view all</a
                >)
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

  <Spacing />
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0 24px;

    a {
      text-decoration: none;
      font-weight: 500;
      transition: 0.25s ease-in-out;

      &:hover {
        color: var(--acm-blue);
      }
    }
  }

  .container {
    text-align: left;
    padding: 4em 4em 3em;
    margin: 0;
    border-radius: 3em;
    width: min(1000px, 70vw);
  }

  img {
    height: 100%;
    width: 12em;
    border-radius: 50%;
  }
</style>
