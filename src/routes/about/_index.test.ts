import { beforeEach, test, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

import About from './index.svelte';

beforeEach(cleanup);

test('can render', () => {
  render(About);
});

test('can find the correct page title', () => {
  const { getByText } = render(About);
  expect(getByText('Who are we?')).toBeDefined();
});
