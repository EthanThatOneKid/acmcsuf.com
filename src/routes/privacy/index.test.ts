import { beforeEach, test, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

import Privacy from './index.svelte';

beforeEach(cleanup);

test('can render', () => {
  render(Privacy);
});

test('can find the correct page title', () => {
  const { getByText } = render(Privacy);
  expect(getByText('Privacy Policy')).toBeDefined();
});
