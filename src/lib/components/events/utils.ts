import { toast, ToastType } from '$lib/stores/toasts';

/** @see <https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText> */
export function copy(link: string, successMessage: string, errorMessage: string, path: string) {
  navigator.clipboard
    .writeText(link)
    .then(() => toast({ content: successMessage, path }))
    .catch(() => toast({ path, type: ToastType.Error, content: errorMessage }));
}

export function formatLocation(location?: string | null, hosted = ['Discord', 'Zoom']): string {
  // '', null, and undefined are all TBD
  location = location?.trim() ?? '';
  if (location === '') return 'TBD';
  return hosted.includes(location) ? `Hosted on ${location}` : location;
}
