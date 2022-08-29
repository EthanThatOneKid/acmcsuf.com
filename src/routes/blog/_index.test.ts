import { beforeEach, test, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import { posts as SAMPLE_POSTS } from './_testdata/posts';

import Blog from './index.svelte';

beforeEach(cleanup);

test('can render', () => {
  render(Blog);
});

test('can find the correct page title', () => {
  const { getByText } = render(Blog);
  expect(getByText('The official ACM at CSUF blog.')).toBeDefined();
});

test('can render blog posts', () => {
  const { container } = render(Blog, { posts: SAMPLE_POSTS });
  const actual = container.querySelectorAll('.blog-post').length;
  expect(actual).toBeGreaterThan(0);
});
