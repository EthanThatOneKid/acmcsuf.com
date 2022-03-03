import { acmGeneral } from '$lib/constants';
import { writable } from 'svelte/store';

const MAX_TOASTS = 4;
const TOAST_TIMEOUT = 2e3;

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
  path?: string;
}

export const toasts = writable<Toast[]>([]);

function makeToast(
  id: number,
  { content, type, dismissible, timeout, path }: Omit<Toast, 'id'>
): Required<Toast> {
  return {
    id,
    content: content,
    type: type ?? ToastType.Info,
    dismissible: dismissible ?? true,
    timeout: timeout ?? TOAST_TIMEOUT,
    path: path ?? acmGeneral.slug,
  };
}

export function toast(props: Omit<Toast, 'id'>): void {
  numToasts.update((value: number) => {
    const nextToast = makeToast(value + 1, props);

    toasts.update((allToasts) => {
      postponeDismissal(nextToast.id, nextToast.timeout);

      while (allToasts.length > MAX_TOASTS - 1) {
        const currId = allToasts[0].id;
        dismissToast(currId);
        allToasts.shift();
      }

      return [...allToasts, nextToast];
    });

    return nextToast.id;
  });
}

export function postponeDismissal(id: number, timeout: number): void {
  setTimeout(() => dismissToast(id), timeout);
}

export function dismissToast(id: number): void {
  toasts.update((all) => all.filter((t) => t.id !== id));
}
