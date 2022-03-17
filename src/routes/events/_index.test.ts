import { beforeEach, expect, test } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

import Events from './index.svelte';

beforeEach(cleanup);

test('can render', () => {
  render(Events);
});

test('can find the correct page title', () => {
  const { getByText } = render(Events);
  expect(getByText('Curated events for growth and success')).toBeDefined();
});
