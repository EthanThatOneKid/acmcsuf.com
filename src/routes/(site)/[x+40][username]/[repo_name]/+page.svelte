<script lang="ts">
  import type { PageData } from './$types';
  import { MetaTags } from 'svelte-meta-tags';
  import { page } from '$app/stores';
  import Spacing from '$lib/public/legacy/spacing.svelte';
  import RepositoryCertificate from './repository-certificate.svelte';

  export let data: PageData;

  const pageTitle = `acmcsufoss/${data.certificate.repositoryName} contributions | ${data.certificate.user.name}`;

  function makeDescription(cert: PageData['certificate']): string {
    const { user, merged } = cert;
    const { name, login } = user;

    const contributions =
      merged.length > 0
        ? `made ${merged.length} contribution${merged.length !== 1 ? 's' : ''}`
        : 'did not make a contribution';

    return `${name} (${login}) ${contributions} in the acmcsufoss/${data.certificate.repositoryName} repository!`;
  }
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<MetaTags
  openGraph={{
    title: pageTitle,
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

<RepositoryCertificate data={data.certificate} />

<style>
  :global(main) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
</style>
