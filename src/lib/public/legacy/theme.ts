import { writable } from "svelte/store";

export enum AcmTheme {
  Light = "light",
  Dark = "dark",
}

const ATTRIBUTE_KEY = "data-theme";

function get(): AcmTheme {
  const savedValue = document.documentElement.getAttribute(ATTRIBUTE_KEY);
  if (savedValue === AcmTheme.Dark) return AcmTheme.Dark;
  if (savedValue === AcmTheme.Light) return AcmTheme.Light;
  return matchMedia("(prefers-color-scheme: dark)").matches
    ? AcmTheme.Dark
    : AcmTheme.Light;
}

function save(value: AcmTheme) {
  document.documentElement.setAttribute(ATTRIBUTE_KEY, value);
  // Set the cookie's max age value to a year
  const period = 60 * 60 * 24 * 365;
  document.cookie = `theme=${value}; max-age=${period}; path=/`;

  switch (value) {
    case AcmTheme.Dark: {
      document.documentElement.setAttribute(ATTRIBUTE_KEY, AcmTheme.Dark);
      return;
    }
    default: {
      document.documentElement.setAttribute(ATTRIBUTE_KEY, AcmTheme.Light);
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
      const nextValue = value === AcmTheme.Light
        ? AcmTheme.Dark
        : AcmTheme.Light;
      save(nextValue);
      return nextValue;
    });
  }

  return { subscribe, set, update, init, toggle, save };
}

export const theme = createTheme();
