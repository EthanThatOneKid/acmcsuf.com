import { beforeEach, expect, test } from 'vitest';
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
