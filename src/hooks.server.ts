import { sequence } from '@sveltejs/kit/hooks';
import { shortener } from '$lib/server/links/shortener';
import { i18n } from '$lib/i18n/hook';

/** See: <https://kit.svelte.dev/docs/hooks#server-hooks> */
export const handle = sequence(shortener(), i18n);
