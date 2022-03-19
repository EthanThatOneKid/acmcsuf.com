import { writable } from 'svelte/store';

export enum AcmTheme {
  Light = 'light',
  Dark = 'dark',
}

const STORAGE_KEY = 'theme';

function get(): AcmTheme {
  const savedValue = localStorage.getItem(STORAGE_KEY);
  if (savedValue === AcmTheme.Dark) return AcmTheme.Dark;
  if (savedValue === AcmTheme.Light) return AcmTheme.Light;
  return matchMedia('(prefers-color-scheme: dark)').matches ? AcmTheme.Dark : AcmTheme.Light;
}

function save(value: AcmTheme) {
  localStorage.setItem(STORAGE_KEY, value);

  switch (value) {
    case AcmTheme.Dark: {
      document.body.classList.add(AcmTheme.Dark);
      return;
    }
    default: {
      document.body.classList.remove(AcmTheme.Dark);
      return;
    }
  }
}

function createTheme(defaultValue = AcmTheme.Light) {
  const { subscribe, set, update } = writable<AcmTheme>(defaultValue);

  function init() {
    const saved = get();
    set(saved);
    subscribe(save);
  }

  function toggle() {
    update((value) => {
      const nextValue = value === AcmTheme.Light ? AcmTheme.Dark : AcmTheme.Light;
      save(nextValue);
      return nextValue;
    });
  }

  return { subscribe, set, update, init, toggle, save };
}

export const theme = createTheme();
