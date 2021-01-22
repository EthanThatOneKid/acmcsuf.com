import { highlightBlock } from "highlight.js";

export const highlight = (node) =>
  node.querySelectorAll("pre code").forEach(highlightBlock);
