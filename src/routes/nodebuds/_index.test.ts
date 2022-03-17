import { beforeEach, test, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

import NodeBuds from './index.svelte';

beforeEach(cleanup);

test('can render', () => {
  render(NodeBuds);
});

test('can find the correct page title', () => {
  const { getByText } = render(NodeBuds);
  expect(getByText('Personalized for your success')).toBeDefined();
});
