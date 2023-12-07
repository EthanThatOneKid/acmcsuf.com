<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import type { RepositoryCertificate } from '$lib/public/certificates';

  export let data: RepositoryCertificate;
</script>

<article>
  <Spacing --min="16px" --med="16px" --max="16px" />

  <img src={data.user.picture} alt={`${data.user.name}'s picture`} class="profile-picture" />

  <Spacing --min="16px" --med="16px" --max="16px" />

  <div class="toplevel-text">
    {@html data.user.bio}
  </div>

  <Spacing --min="40px" --med="40px" --max="40px" />

  <details>
    <summary>
      <h1 class="size-l toplevel-text headers">
        <a
          class="username"
          href={`https://github.com/${data.user.login}`}
          target="_blank"
          rel="noopener noreferrer">{data.user.name}</a
        >
        has
        {#if data.issues.length > 0}
          opened <span class="subject"
            >{data.issues.length} issue{data.issues.length !== 1 ? 's' : ''}</span
          >…
        {:else}
          not opened an issue…
        {/if}
      </h1>

      <small class="toplevel-text headers">(click to expand)</small>
    </summary>

    <Spacing --min="20px" --med="20px" --max="20px" />

    <div class="container">
      <ol>
        {#each data.issues as issue (issue.number)}
          <li>
            <a href={issue.url} target="_blank" rel="noopener noreferrer">
              <b>#{issue.number}</b>
              {@html issue.title}
              opened on {new Date(issue.openedAt).toLocaleDateString()}
            </a>
          </li>
        {/each}
      </ol>
    </div>
  </details>

  <Spacing --min="40px" --med="40px" --max="40px" />

  <details>
    <summary>
      <h1 class="size-l toplevel-text headers">
        and
        {#if data.merged.length > 0}
          merged <span class="subject"
            >{data.merged.length} pull request{data.merged.length !== 1 ? 's' : ''}</span
          >
        {:else}
          not merged a pull request
        {/if}
        in
        <a
          href="https://github.com/acmcsufoss/{data.repositoryName}#readme"
          title="View acmcsufoss/{data.repositoryName}'s README"
          target="_blank"
          rel="noopener noreferrer">oss.acmcsuf.com/{data.repositoryName}</a
        >.
      </h1>

      <small class="toplevel-text headers">(click to expand)</small>
    </summary>

    <Spacing --min="20px" --med="20px" --max="20px" />

    <div class="container">
      <ol>
        {#each data.merged as pr (pr.number)}
          <li>
            <a href={pr.url} target="_blank" rel="noopener noreferrer">
              <b>#{pr.number}</b>
              {@html pr.title}
            </a>
            <details>
              <summary>
                {pr.commits.length} commit{pr.commits.length !== 1 ? 's' : ''}
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
  </details>

  <Spacing --min="40px" --med="40px" --max="40px" />

  <p class="toplevel-text award-text">
    Awarded to <a
      class="username"
      href={`https://github.com/${data.user.login}`}
      target="_blank"
      rel="noopener noreferrer">{data.user.name}</a
    >
    for contributing to our internal open source software organization.
    <br /><br />Recognized with 💖 by
    <a href="https://oss.acmcsuf.com/" target="_blank" rel="noopener noreferrer"
      >ACM at CSUF's Open Source Software Team</a
    >!

    <img
      src="/assets/badges/logo/oss-logo.svg"
      alt="ACM at CSUF's Open Source Software Team logo"
    />
  </p>
</article>

<style lang="scss">
  article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100%;

    details:has(summary:hover) {
      outline: 5px solid var(--acm-blue);
      border-radius: 5px;
    }

    summary {
      list-style: none;
    }

    summary:hover {
      h1 .subject {
        color: var(--acm-blue);
      }
    }

    .username {
      text-decoration: underline;
      font-weight: 500;
    }

    .toplevel-text {
      margin: 0 3rem;
    }

    h1 a {
      color: var(--acm-blue);
    }

    a {
      text-decoration: underline;
      font-weight: 500;
      transition: 0.25s ease-in-out;

      &:hover {
        b {
          text-decoration: underline;
        }

        color: var(--acm-blue);
      }
    }

    .award-text {
      text-align: center;
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

        &[open] {
          color: var(--acm-blue);
        }

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

  .profile-picture {
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
</style>
