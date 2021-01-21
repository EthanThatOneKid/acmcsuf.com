import hljs from "highlight.js";

export default function highlight(element) {
  element.querySelectorAll("pre code").forEach(hljs.highlightBlock);
}
