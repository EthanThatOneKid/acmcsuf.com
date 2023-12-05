<script lang="ts">
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import type { RepositoryCertificate } from '$lib/public/certificates';

  export let data: RepositoryCertificate;
</script>

<article>
  <Spacing --min="16px" --med="16px" --max="16px" />

  <img src={data.user.picture} alt={`${data.user.name}'s picture`} />

  <Spacing --min="16px" --med="16px" --max="16px" />

  <h1 class="size-l toplevel-text headers">
    <a
      class="username"
      href={`https://github.com/${data.user.login}`}
      target="_blank"
      rel="noopener noreferrer">{data.user.name}</a
    >
    has
    {#if data.merged.length > 0}
      made {data.merged.length} contribution{data.merged.length !== 1 ? 's' : ''}
    {:else}
      not make a contribution
    {/if}
    in
    <a
      href="https://github.com/acmcsufoss/{data.repositoryName}#readme"
      title="View acmcsufoss/{data.repositoryName}'s README"
      target="_blank"
      rel="noopener noreferrer">oss.acmcsuf.com/{data.repositoryName}</a
    >.
  </h1>

  <Spacing --min="40px" --med="40px" --max="40px" />

  <div class="toplevel-text">
    {@html data.user.bio}
  </div>

  <Spacing --min="40px" --med="40px" --max="40px" />

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
</style>
