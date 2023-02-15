import { writable } from 'svelte/store';

export function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  } as T;
}

export function debounceable<T>(initialValue: T, delay: number) {
  const store = writable(initialValue);
  store.set = debounce(store.set, delay);
  return store;
}
