# Internal iCal Library

We fetch a public iCal file (with `.ics` extension) that is made available by the public ACM CSUF Google Calendar.
This is the simplest way to receive calendar data over the wire, however, requires a parser in our language of choice.
For this project, we have a simple, custom TypeScript iCal parser to generate a list of ACM CSUF events for our [`acmcsuf.com/events`](https://acmcsuf.com/events) page.

The official, public ACM CSUF Google Calendar `.ics` file is fetched on `https://calendar.google.com/calendar/ical/738lnit63cr2lhp7jtduvj0c9g%40group.calendar.google.com/public/basic.ics`.
