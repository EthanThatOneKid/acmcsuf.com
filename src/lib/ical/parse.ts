import { Temporal } from '@js-temporal/polyfill';
import { DEBUG } from '$lib/constants';
import { walkICAL, makeAcmEvent, AcmEvent, ICALParseOptions } from './utils';

export function parse(rawICAL: string, options?: ICALParseOptions): AcmEvent[] {
  const acmEvents: AcmEvent[] = [];

  const refDate = options.referenceDate ?? Temporal.Now.zonedDateTimeISO('America/Los_Angeles');

  for (const icalEvent of walkICAL(rawICAL)) {
    const acmEvent = makeAcmEvent(icalEvent, refDate);

    // skip events that have already ended (except when in debug mode)
    if (!acmEvent.hasEnded || DEBUG) {
      acmEvents.push(acmEvent);
    }
  }

  const sortedAcmEvents = acmEvents.sort((one, two) =>
    Temporal.ZonedDateTime.compare(one.date, two.date)
  );

  // serve a set amount of events when in debug mode
  // @see <https://etok.codes/acmcsuf.com/pull/329>
  if (DEBUG) {
    return sortedAcmEvents.slice(-1 * (options.maxEvents ?? 5));
  }

  return sortedAcmEvents;
}
