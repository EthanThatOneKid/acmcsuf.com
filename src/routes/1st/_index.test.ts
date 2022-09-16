import { beforeEach, test, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

import First from './index.svelte';

beforeEach(cleanup);

test('can render', () => {
  render(First);
});

test('can find the correct page title', () => {
  const { getByText } = render(First);
  expect(getByText('acmcsuf.com/1st aims to simplify')).toBeDefined();
});
