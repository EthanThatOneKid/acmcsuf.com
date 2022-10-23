import { toast, ToastType } from '$lib/components/toaster/toasts';

/** @see <https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText> */
export function copy(link: string, successMessage: string, errorMessage: string, teamId: string) {
  navigator.clipboard
    .writeText(link)
    .then(() => toast({ content: successMessage, teamId }))
    .catch(() => toast({ teamId, type: ToastType.Error, content: errorMessage }));
}
