import type { ClubEvent } from '$lib/public/events/event';
import { Temporal } from '@js-temporal/polyfill';
import type { GCalEvent } from './gcal';

/**
 * Creates a ClubEvent from a Google Calendar event object
 * if it has the required properties. Returns null otherwise.
 * Google Calendar 이벤트 객체에서 필요한 속성이 있으면 ClubEvent를 생성하고, 그렇지 않으면 null을 반환합니다.
 */
export function makeClubEvent(event: GCalEvent, refDate: Temporal.ZonedDateTime): ClubEvent | null {
  // Check for required fields in the event object
  // 이벤트 객체의 필수 필드를 확인합니다.
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

  // Convert Google Calendar start and end dateTimes to Temporal ZonedDateTime
  // Google Calendar의 시작 및 종료 날짜/시간을 Temporal ZonedDateTime으로 변환합니다.
  const dtStart = zonedDateTimeFromGCalDateTime(
    new Date(event.start.dateTime),
    refDate.getTimeZone()
  );
  const dtEnd = zonedDateTimeFromGCalDateTime(new Date(event.end.dateTime), refDate.getTimeZone());

  // Extract date, month, day, start and end times in human-readable formats
  // 날짜, 월, 일, 시작 및 종료 시간을 사람이 읽을 수 있는 형식으로 추출합니다.
  const date = dtStart.toString();
  const month = dtStart.toLocaleString('en-US', { month: 'long' });
  const day = dtStart.day;
  const startTime = dtStart
    .toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })
    .replace(' ', ' ');
  const endTime = dtEnd
    .toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })
    .replace(' ', ' ');

  // Check if the event has started or ended based on the reference date
  // 기준 날짜를 기준으로 이벤트가 시작되었거나 종료되었는지 확인합니다.
  const hasStarted = Temporal.ZonedDateTime.compare(refDate, dtStart) >= 0;
  const hasEnded = Temporal.ZonedDateTime.compare(refDate, dtEnd) >= 0;

  // Parse the event's location and description
  // 이벤트의 위치와 설명을 분석합니다.
  const { location, meetingLink } = parseLocation(event.location);
  const title = event.summary;
  const { description, variables } = parseDescription(event.description);

  // Generate unique identifiers and links for the event
  // 이벤트에 대한 고유 식별자와 링크를 생성합니다.
  const id = makeEventId(title, dtStart);
  const selfLink = makeEventLink(id);

  // Check if the event is recurring
  // 이벤트가 반복되는지 확인합니다.
  const recurring = (event?.recurrence?.length ?? 0) > 0;

  // Produce a summary for the event
  // 이벤트에 대한 요약을 생성합니다.
  const summary = produceSummary(title, description, selfLink);

  // Determine the team associated with the event based on variables
  // 변수에 따라 이벤트와 관련된 팀을 결정합니다.
  const teamID =
    (variables.get('ACM_TEAM') ?? variables.get('ACM_PATH'))?.toLowerCase().trim() ?? 'general';

  // Define location for third-party calendar links (e.g., Google or Outlook)
  // 서드파티 캘린더 링크(예: Google 또는 Outlook)를 위한 위치를 정의합니다.
  const thirdPartyCalendarLocation = location === 'Discord' ? selfLink : location;
  const thirdPartyCalendarArgs = [
    title,
    summary,
    thirdPartyCalendarLocation,
    dtStart,
    dtEnd,
  ] as const;

  // Generate calendar links for Google and Outlook
  // Google 및 Outlook에 대한 캘린더 링크를 생성합니다.
  const calendarLinks = {
    google: makeGoogleCalendarLink(...thirdPartyCalendarArgs).toString(),
    outlook: makeOutlookCalendarLink(...thirdPartyCalendarArgs).toString(),
  };

  // Return the fully constructed ClubEvent object
  // 완전히 구성된 ClubEvent 객체를 반환합니다.
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
 * Parses the description of the event to extract variables with a specified prefix.
 * 이벤트의 설명을 파싱하여 지정된 접두사를 가진 변수를 추출합니다. 
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

  // Replace newlines with HTML line breaks
  // 줄 바꿈을 HTML 줄 바꿈으로 교체합니다.
  let description = content.replace(/\\n/g, '<br>');

  // Extract prefixed variables until none remain
  // 접두사가 있는 변수를 더 이상 남지 않을 때까지 추출합니다.
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

  // Ensure links open in a new tab
  // 링크가 새 탭에서 열리도록 합니다.
  description = replaceHtmlLinkTargets(description);

  return { description, variables };
}

/**
 * Ensures all anchor tags in HTML have a target attribute.
 * HTML의 모든 앵커 태그에 target 속성이 있도록 합니다.
 */
export function replaceHtmlLinkTargets(html: string, withTarget = '_blank'): string {
  return html.replace(/<a\W.*?href=".*?".*?>/gm, (match: string): string => {
    match = match.replace(/target=".*?"\W*/gm, '');
    return match.slice(0, match.length - 1) + ` target="${withTarget}">`;
  });
}

/**
 * Parses the event's location and meeting link.
 * 이벤트의 위치와 회의 링크를 분석합니다.
 */
export function parseLocation(
  rawLocation?: string,
  defaultLocation = 'TBD',
  defaultLink = '/discord'
): { location: string; meetingLink: string } {
  rawLocation = rawLocation?.trim() ?? '';

  if (rawLocation.includes('zoom.us')) {
    return { location: 'Zoom', meetingLink: rawLocation };
  }

  if (rawLocation.startsWith('https://')) {
    return { location: defaultLocation, meetingLink: rawLocation };
  }

  if (rawLocation.length > 0) {
    return { location: rawLocation, meetingLink: defaultLink };
  }

  return { location: defaultLocation, meetingLink: defaultLink };
}

/**
 * Formats a ZonedDateTime to a string for third-party calendar links.
 * ZonedDateTime을 서드파티 캘린더 링크용 문자열로 형식화합니다.
 */
export function thirdPartyCalendarDateTimeFromZonedDateTime(
  dt: Temporal.ZonedDateTimeLike
): string {
  const yyyyMMdd = [dt.year, dt.month, dt.day].map((d) => Number(d).toString().padStart(2, '0'));
  const hhMMss = [dt.hour, dt.minute, dt.day].map((d) => Number(d).toString().padStart(2, '0'));
  const yyyyMMddThhMMss = `${yyyyMMdd.join('')}T${hhMMss.join('')}`;
  return yyyyMMddThhMMss;
}

/**
 * Constructs a link for the event.
 * 이벤트에 대한 링크를 생성합니다.
 */
export function makeEventLink(slug?: string, baseURL = 'https://acmcsuf.com/events') {
  if (slug === undefined) return baseURL;
  return baseURL + '#' + slug;
}

/**
 * Creates a unique event ID based on title and date.
 * 제목과 날짜를 기반으로 고유한 이벤트 ID를 생성합니다.
 */
export function makeEventId(title: string, date: Temporal.ZonedDateTime): string {
  const normalizedTitle = title.replace(/[^\w\s-_]/g, '').replace(/(\s|-|_)+/g, '-');
  return [
    normalizedTitle,
    date.year,
    date.toLocaleString('en-US', { month: 'long' }).toLowerCase(),
    date.day,
  ]
    .join('-')
    .toLowerCase();
}

/**
 * Generates a Google Calendar link for the event.
 * 이벤트에 대한 Google 캘린더 링크를 생성합니다.
 */
export function makeGoogleCalendarLink(
  title: string,
  summary: string,
  location: string,
  startTime: Temporal.ZonedDateTime,
  endTime: Temporal.ZonedDateTime
) {
  const url = new URL('https://calendar.google.com/calendar/render');
  
  // Encode URI components for safe URL
  // 안전한 URL 생성을 위해 URI 구성 요소를 인코딩합니다.
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', title);
  url.searchParams.set('details', summary);
  url.searchParams.set('location', location);

  const dateOne = thirdPartyCalendarDateTimeFromZonedDateTime(startTime);
  const dateTwo = thirdPartyCalendarDateTimeFromZonedDateTime(endTime);
  url.searchParams.set('dates', dateOne + '/' + dateTwo);

  return url;
}

/**
 * Generates an Outlook Calendar link for the event.
 * 이벤트에 대한 Outlook 캘린더 링크를 생성합니다.
 */
export function makeOutlookCalendarLink(
  title: string,
  summary: string,
  location: string,
  dtStart: Temporal.ZonedDateTime,
  dtEnd: Temporal.ZonedDateTime
) {
  const url = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
  
  // Encode URI components for safe URL
  // 안전한 URL 생성을 위해 URI 구성 요소를 인코딩합니다.
  url.searchParams.set('path', '/calendar/action/compose');
  url.searchParams.set('rru', 'addevent');
  url.searchParams.set('startdt', thirdPartyCalendarDateTimeFromZonedDateTime(dtStart));
  url.searchParams.set('enddt', thirdPartyCalendarDateTimeFromZonedDateTime(dtEnd));
  url.searchParams.set('subject', title);
  url.searchParams.set('body', summary);
  url.searchParams.set('location', location);

  return url;
}

/**
 * Produces a summary for the event, optionally with a self-link.
 * 이벤트에 대한 요약을 생성합니다.
 */
export function produceSummary(title: string, description: string, selfLink: string): string {
  if (description.length > 0) {
    return description + ' ' + selfLink;
  }
  return title + ' ' + selfLink;
}

/**
 * Converts a Date to a Temporal.ZonedDateTime.
 * Date를 Temporal.ZonedDateTime로 변경합니다. 
 */
function zonedDateTimeFromGCalDateTime(
  dt: Date,
  timeZone: string = 'America/Los_Angeles'
): Temporal.ZonedDateTime {
  return Temporal.ZonedDateTime.from({ ...Temporal.Instant.from(dt).toZonedDateTimeISO(timeZone) });
}
