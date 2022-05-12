import { readFileSync } from 'fs';
import { beforeEach, test, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

import Blog from './index.svelte';

beforeEach(cleanup);

test('can render', () => {
  render(Blog);
});

test('can find the correct page title', () => {
  const { getByText } = render(Blog);
  expect(getByText('The official acmCSUF blog.')).toBeDefined();
});

test('can render 3 blog posts', () => {
  const MAX_POSTS = 3;
  const TEST_DATA = readFileSync('./src/routes/blog/_testdata/posts.json', 'utf-8');
  const { container } = render(Blog, { posts: JSON.parse(TEST_DATA) });
  const actual = container.querySelectorAll('.blog-post').length;
  expect(actual).toBe(MAX_POSTS);
});
