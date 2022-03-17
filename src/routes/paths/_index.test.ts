import { beforeEach, expect, test } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

import Paths from './index.svelte';

beforeEach(cleanup);

test('can render', () => {
  render(Paths);
});

test('can find the correct page title', () => {
  const { getByText } = render(Paths);
  expect(getByText('What are paths?')).toBeDefined();
});
