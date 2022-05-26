/**
 * Takes a string input (either html or plaintext) and calculates the time
 * (in minutes) to read a blog post, By default it uses 225 (the default adult
 * average reading time based on a quick Google search), but may be overridden
 * with the `wpm` parameter.
 * @param blogContent The string containing the blog text
 * @param wpm (Optional) defines words per minute to assume the reader reads at
 * @returns The estimated read time of an article in minutes
 */
export function readingTime(blogContent: string, wpm = 225) {
  // Regex taken from https://stackoverflow.com/a/5002161 to parse out HTML tags
  const text = blogContent.replace(/<\/?[^>]+(>|$)/, '').trim();
  return Math.ceil(text.split(/\s+/).length / wpm);
}
