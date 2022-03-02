import { writable } from 'svelte/store';

const numToasts = writable<number>(0);

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

export interface Toast {
  id: number;
  content: string;
  type?: ToastType;
  dismissible?: boolean;
  timeout?: number;
}

export const toasts = writable<Toast[]>([]);

function makeToast(
  id: number,
  { content, type, dismissible, timeout }: Omit<Toast, 'id'>
): Required<Toast> {
  return {
    id,
    content: content,
    type: type ?? ToastType.Info,
    dismissible: dismissible ?? true,
    timeout: timeout ?? 3e3,
  };
}

export function toast(props: Omit<Toast, 'id'>) {
  numToasts.update((value: number) => {
    const nextToast = makeToast(value + 1, props);

    toasts.update((allToasts) => {
      postponeDismissal(nextToast.id, nextToast.timeout);
      allToasts = [...allToasts, nextToast];
      console.log({ allToasts });
      return allToasts;
    });

    return nextToast.id;
  });
}

export function postponeDismissal(id: number, timeout: number) {
  setTimeout(() => dismissToast(id), timeout);
}

export function dismissToast(id: number) {
  toasts.update((all) => all.filter((t) => t.id !== id));
}
