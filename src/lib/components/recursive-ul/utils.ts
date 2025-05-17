import type { ListItem } from "./types";

export function li(html: string, children?: ListItem[]): ListItem {
  return { html, children };
}
