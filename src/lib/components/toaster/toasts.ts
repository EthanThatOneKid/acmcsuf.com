import { TEAMS } from '$lib/public/board/data';
import { writable } from 'svelte/store';

const MAX_TOASTS = 4;
const TOAST_TIMEOUT = 2e3;

const numToasts = writable<number>(0);

export enum ToastType {
  Success = 'success',
  Error = 'error',
}

export interface Toast {
  id: number;
  content: string | (() => string | Promise<string>);
  type?: ToastType;
  dismissible?: boolean;
  timeout?: number;
  teamId?: string;
}

export const toasts = writable<Toast[]>([]);

function makeToast(
  id: number,
  { content, type, dismissible, timeout, teamId }: Omit<Toast, 'id'>
): Required<Toast> {
  return {
    id,
    content: content,
    type: type ?? ToastType.Success,
    dismissible: dismissible ?? true,
    timeout: timeout ?? TOAST_TIMEOUT,
    teamId: teamId ?? TEAMS.general.id,
  };
}

export async function toast(contentOrProps: Toast['content'] | Omit<Toast, 'id'>): Promise<void> {
  let props: Omit<Toast, 'id'>;
  if (typeof contentOrProps == 'object') {
    props = contentOrProps;
  } else {
    props = {
      content: contentOrProps,
    };
  }

  if (typeof props.content == 'function') {
    try {
      props.content = await props.content();
    } catch (err) {
      props.content = `${err}`;
      props.type = ToastType.Error;
    }
  }

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
