import type { PageLoadEvent } from './$types';
import type { ClubEvent } from '$lib/public/events/event';

export async function load({ fetch }: PageLoadEvent) {
  const response = await fetch(`/events/all.json`);
  const events: ClubEvent[] = await response.json();
  return { events };
}
