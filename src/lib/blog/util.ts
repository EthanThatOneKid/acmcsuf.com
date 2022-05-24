/**
 * Takes a string (either html or plaintext) and calculates the time
 * (in minutes) to read a blog post, By default it uses 225 the default adult
 * average reading time based on a quick google search, but may be overrided
 * with the wpm parameter
 * @param string The string containing the blog text
 * @param wpm (Optional) defines words per minute to assume the reader reads at
 * @returns The estimated read time of an article in minutes
 */
export function readingTime(string: string, wpm = 225) {
  const text = string.replace(/<\/?[^>]+(>|$)/, '').trim();
  return Math.ceil(text.split(/\s+/).length / wpm);
}
