import { beforeEach, test, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

import Algo from './index.svelte';

beforeEach(cleanup);

test('can render', () => {
  render(Algo);
});

test('can find the correct page title', () => {
  const { getByText } = render(Algo);
  expect(
    getByText('This path is dedicated to building the programming proficiency of students.')
  ).toBeDefined();
});
