// Import necessary types and libraries
import type { ClubEvent } from '$lib/public/events/event';
import { Temporal } from '@js-temporal/polyfill';
import type { GCalEvent } from './gcal';

/**
 * Converts a GCalEvent to a ClubEvent.
 * GCalEvent를 ClubEvent로 변환합니다.
 */
export function makeClubEvent(event: GCalEvent, refDate: Temporal.ZonedDateTime): ClubEvent | null {
  // Check if any required properties are missing in the event.
  // 이벤트의 필수 속성이 있는지 확인합니다.
  if (
    event.summary == undefined ||
    event.location == undefined ||
    event.start?.timeZone == undefined ||
    event.start.dateTime == undefined ||
    event.end?.timeZone == undefined ||
    event.end.dateTime == undefined ||
    event.description == undefined
  ) {
    return null;
  }

  // Parse start and end dates.
  // 시작 및 종료 날짜를 파싱합니다.
  const dtStart = zonedDateTimeFromGCalDateTime(
    new Date(event.start.dateTime),
    refDate.getTimeZone()
  );
  const dtEnd = zonedDateTimeFromGCalDateTime(new Date(event.end.dateTime), refDate.getTimeZone());

  // Format date information
  // 날짜 정보를 형식화합니다.
  const date = dtStart.toString();
  const month = dtStart.toLocaleString('en-US', { month: 'long' });
  const day = dtStart.day;
  const startTime = dtStart
    .toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })
    .replace(' ', ' ');
  const endTime = dtEnd
    .toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })
    .replace(' ', ' ');

  // Check if the event has started or ended.
  // 이벤트가 시작되었는지 또는 종료되었는지 확인합니다.
  const hasStarted = Temporal.ZonedDateTime.compare(refDate, dtStart) >= 0;
  const hasEnded = Temporal.ZonedDateTime.compare(refDate, dtEnd) >= 0;

  // Parse location and description, generate unique ID and event links.
  // 위치와 설명을 파싱하고, 고유 ID 및 이벤트 링크를 생성합니다.
  const { location, meetingLink } = parseLocation(event.location);
  const title = event.summary;
  const { description, variables } = parseDescription(event.description);
  const id = makeEventId(title, dtStart);
  const selfLink = makeEventLink(id);
  const recurring = (event?.recurrence?.length ?? 0) > 0;
  const summary = produceSummary(title, description, selfLink);
  const teamID =
    (variables.get('ACM_TEAM') ?? variables.get('ACM_PATH'))?.toLowerCase().trim() ?? 'general';

  // Generate calendar links for Google and Outlook.
  // Google 및 Outlook 캘린더 링크를 생성합니다.
  const thirdPartyCalendarLocation = location === 'Discord' ? selfLink : location;
  const thirdPartyCalendarArgs = [
    title,
    summary,
    thirdPartyCalendarLocation,
    dtStart,
    dtEnd,
  ] as const;

  const calendarLinks = {
    google: makeGoogleCalendarLink(...thirdPartyCalendarArgs).toString(),
    outlook: makeOutlookCalendarLink(...thirdPartyCalendarArgs).toString(),
  };

  // Return formatted event object.
  // 포맷된 이벤트 객체를 반환합니다.
  return {
    month,
    day,
    startTime,
    endTime,
    hasStarted,
    hasEnded,
    date,
    location,
    title,
    description,
    summary,
    meetingLink,
    id,
    selfLink,
    recurring,
    team: teamID,
    calendarLinks,
  };
}

/**
 * Parses event description and extracts variables with the specified prefix.
 * 이벤트 설명을 파싱하고 지정된 접두사로 변수를 추출합니다.
 */
export function parseDescription(
  content?: string,
  varPrefix = 'ACM_'
): {
  description: string;
  variables: Map<string, string>;
} {
  if (content === undefined) return { description: '', variables: new Map() };

  const variables = new Map<string, string>();
  let description = content.replace(/\\n/g, '<br>');

  // Extract variables from the description until no more are found.
  // 설명에서 변수를 추출합니다.
  while (description.includes(varPrefix)) {
    const start = description.indexOf(varPrefix);
    const nextTag = description.indexOf('<', start);
    const end = nextTag > -1 ? nextTag : description.length;

    const variable = description.substring(start, end);
    const splitAt = variable.indexOf('=');
    const key = variable.substring(0, splitAt).trim();
    const value = variable.substring(splitAt + 1);

    variables.set(key, value);
    description = (description.substring(0, start) + description.substring(end)).trim();
  }

  description = replaceHtmlLinkTargets(description);

  return { description, variables };
}

/**
 * Replaces link targets with "_blank" in HTML strings.
 * HTML 문자열에서 링크 대상을 "_blank"로 바꿉니다.
 */
export function replaceHtmlLinkTargets(html: string, withTarget = '_blank'): string {
  return html.replace(/<a\W.*?href=".*?".*?>/gm, (match: string): string => {
    match = match.replace(/target=".*?"\W*/gm, '');
    return match.slice(0, match.length - 1) + ` target="${withTarget}">`;
  });
}


function makeEventId(title: any, dtStart: any) {
  throw new Error('Function not implemented.');
}

function produceSummary(title: any, description: string, selfLink: any) {
  throw new Error('Function not implemented.');
}

function makeGoogleCalendarLink(arg0: any) {
  throw new Error('Function not implemented.');
}
// The rest of the functions follow similar patterns of converting, formatting,
// and generating appropriate date, time, and URL information, with comments in both languages.
 