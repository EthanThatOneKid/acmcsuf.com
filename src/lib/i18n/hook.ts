import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';

export const i18n: Handle = async ({ event, resolve }) => {
  const lang = event.request.headers.get('accept-language')?.split(',')[0];
  if (lang) {
    locale.set(lang);
  }

  return resolve(event);
};
