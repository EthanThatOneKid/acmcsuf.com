import { sequence } from '@sveltejs/kit/hooks';
import { urlShortener } from './url-shortener';

/** read <https://kit.svelte.dev/docs#modules-sveltejs-kit-hooks> */
export const handle = sequence(urlShortener());
