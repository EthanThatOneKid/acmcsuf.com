import { toast, ToastType } from '$lib/components/toaster/toasts';

export default function copy(
  link: string,
  successMessage: string,
  path: string,
  errorMessage: string
) {
  navigator.clipboard
    .writeText(link)
    .then(() => toast({ content: successMessage, path }))
    .catch(() => toast({ path, type: ToastType.Error, content: errorMessage }));
}
