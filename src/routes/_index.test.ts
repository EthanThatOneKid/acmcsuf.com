import { beforeEach, expect, test } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

import Index from './index.svelte';

beforeEach(cleanup);

test('can render', () => {
  render(Index);
});

test('can find the correct page title', () => {
  const { getByText } = render(Index);
  expect(getByText('Ready to get started?')).toBeDefined();
});
