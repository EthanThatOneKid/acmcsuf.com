import { sequence } from '@sveltejs/kit/hooks';
import { shortener } from '$lib/links/shortener';

/** See: <https://kit.svelte.dev/docs/hooks#server-hooks> */
export const handle = sequence(shortener());
