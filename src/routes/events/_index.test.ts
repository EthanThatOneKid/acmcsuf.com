import { readFileSync } from 'fs';
import { beforeEach, expect, test } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

import Events from './index.svelte';
import { parse } from '$lib/ical/parse';

beforeEach(cleanup);

test('can render', () => {
  render(Events);
});

test('can find the correct page title', () => {
  const { getByText } = render(Events);
  expect(getByText('Curated events for growth and success')).toBeDefined();
});

test('renders 10 event items', async () => {
  const TEST_DATA = readFileSync('./src/routes/events/_testdata/events.ics', 'utf-8');
  const TEST_EVENTS = parse(TEST_DATA);
  const { container } = render(Events, { events: TEST_EVENTS });
  expect(container.querySelectorAll('.event-box').length).toBe(10);
});
