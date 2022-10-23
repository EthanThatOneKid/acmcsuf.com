/**
 * Link interface for shortlinks.
 *
 * Example 1: '/example' -> 'https://example.com'
 * Example 2: '/example?foo=bar' -> 'https://example.com?foo=bar'
 * Example 3: '/example#hash' -> 'https://example.com#hash'
 */
export interface Link<ID extends string> {
  /**
   * Example 1: 'example'
   * Example 2: 'example'
   * Example 3: 'example'
   */
  id?: ID;

  /**
   * Example 1: 'https://example.com'
   * Example 2: 'https://example.com'
   * Example 3: 'https://example.com'
   */
  base: string;

  /**
   * Example 1: '/example'
   * Example 2: '/example'
   * Example 3: '/example'
   */
  pathname: string;

  /**
   * Example 1: ''
   * Example 2: ''
   * Example 3: ''
   */
  relativePathname: string;

  /**
   * Example 1: ''
   * Example 2: '?foo=bar'
   * Example 3: ''
   */
  query: string;

  /**
   * Example 1: ''
   * Example 2: ''
   * Example 3: '#hash'
   */
  hash: string;
}
