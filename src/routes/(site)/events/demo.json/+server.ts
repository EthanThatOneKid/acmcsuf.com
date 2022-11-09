import { google } from 'googleapis';

export async function GET() {
  const events = await listUpcomingEvents();
  return new Response(JSON.stringify(events), { status: 200 });
}


