import { Temporal } from '@js-temporal/polyfill';
import type { ClubEvent } from '$lib/public/events/event';
import { calendar } from '@googleapis/calendar';
import { makeClubEvent } from './event';
import { GCAL_API_KEY, GCAL_ID } from '$lib/server/env';

// Google Calendar의 이벤트 목록을 받아와서 ClubEvent 형식으로 변환합니다.
// Fetches the list of Google Calendar events and converts it into ClubEvent format.
export function fromGCal(events: GCalEvent[]): ClubEvent[] {
  const sortedEvents: ClubEvent[] = [];
  const refDate = Temporal.Now.zonedDateTimeISO('America/Los_Angeles'); 
  
  // 모든 이벤트를 반복하여 ClubEvent 형식으로 변환합니다.
  // Loops through all events and converts them into ClubEvent format.
  for (const event of events) {
    const clubEvent = makeClubEvent(event, refDate); // 이벤트 변환 / Convert event.
    if (clubEvent !== null) {
      sortedEvents.push(clubEvent); // 변환된 이벤트를 정렬된 이벤트 배열에 추가 / Add converted event to sorted array.
    }
  }

  return sortedEvents;
}

// 팀별로 분류된 Google Calendar 이벤트 목록을 가져옵니다.
// Fetches the list of Google Calendar events grouped by team.
export async function listUpcomingEventsByTeam() {
  const cal = calendar({
    version: 'v3',
    auth: GCAL_API_KEY,
  });
  
  // Google Calendar에서 다가오는 이벤트를 가져옵니다.
  // Fetch upcoming events from Google Calendar.
  const events = (
    (await cal.events.list({
      calendarId: GCAL_ID,
      timeMin: new Date().toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
      showDeleted: false,
    }))?.data?.items ?? []
  );

  // 팀별로 이벤트를 그룹화할 객체를 생성합니다.
  // Create an object to group events by team.
  const groupedEvents: Record<string, ClubEvent[]> = {};

  // 각 이벤트를 반복하여 팀 이름을 기준으로 그룹화합니다.
  // Loop through each event and group by team name.
  events.forEach(event => {
    // 팀 이름을 추출하기 위해 이벤트 이름의 첫 단어를 사용합니다.
    // Use the first word in the event name as the team name.
    const teamName = event.summary.split(" ")[0]; 
    if (!groupedEvents[teamName]) {
      groupedEvents[teamName] = []; // 팀이 아직 없으면 새 배열을 만듭니다. / Create a new array if team doesn't exist.
    }
    
    // 이벤트를 ClubEvent 형식으로 변환합니다.
    // Convert event to ClubEvent format.
    const clubEvent = makeClubEvent(event, Temporal.Now.zonedDateTimeISO('America/Los_Angeles'));
    if (clubEvent) {
      groupedEvents[teamName].push(clubEvent); // 팀별 배열에 변환된 이벤트를 추가합니다. / Add the converted event to the team's array.
    }
  });

  return groupedEvents; // 팀별로 그룹화된 이벤트를 반환합니다. / Return events grouped by team.
}

// Google Calendar 이벤트 유형을 정의합니다.
// Define the Google Calendar event type.
export type GCalEvent = Exclude<Awaited<ReturnType<typeof listUpcomingEventsByTeam>>, undefined>[number];
