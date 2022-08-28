import { calendar_event } from '@prisma/client';
import { parseDate } from 'chrono-node';
import * as _ from 'lodash';
import { EventCreate, GoogleCalendarEvent } from './types/common';
import { MeetupEvent } from './types/meetup';
import { SerpApiEvent } from './types/serpApi';
import { TicketMasterEvent } from './types/ticketMaster';

export function convertArbitraryDateStringToISODate(dateStr: string): string {
  const parseAttempt = parseDate(dateStr);
  if (!parseAttempt) {
    return dateStr;
  }
  return parseAttempt.toISOString();
}

// conditionallyReturnConcat
function crc(a, b): string {
  if (a) {
    return a + b;
  }
  return '';
}

export function mapEventsToGcalEvent(
  events: (calendar_event & {
    location: any;
  })[]
): GoogleCalendarEvent[] {
  return events.map((e) => {
    //const locString = `${crc(e.venue_name, ' ')}${e.location.address_line_1}, ${e.location.city} ${e.location.state} + ${e.location.zip}`; // TODO make this properly handle certain fields missing
    const locString =
      crc(e.venue_name, ' ') +
        crc(e.location.address_line_1, ', ') +
        crc(e.location.city, ' ') +
        crc(e.location.state, ' ') +
        e.location.zip ?? '';
    const start = convertArbitraryDateStringToISODate(e.start);
    const end = convertArbitraryDateStringToISODate(e.end); // TODO: make sure things are properly converted here

    return {
      end: {
        dateTime: start,
      },
      start: {
        dateTime: end,
      },
      location: locString,
      title: e.title,
      summary: e.title,
      description: e.description, // TODO add other fields, i.e. id
    };
  });
}

export function tryCatchWrapper(fn: any, params: any): void {
  try {
    fn(...params);
  } catch (err: any) {
    console.error(err);
  }
}

export function standardizeSerpapiEvents(rawEvent: SerpApiEvent): EventCreate {
  console.log('stand rawEvent');
  console.log(rawEvent);

  const { title, date, address, link, thumbnail } = rawEvent;

  return {
    locationData: {
      addressLine1: address[0],
      city: address[1],
      state: address[2],
    },
    eventData: {
      source: 'SERPAPI',
      description: title + '\n' + link,
      start: date?.start_date,
      end: date?.start_date,
      title: title,
    },
  };
}

export function standardizeMeetupEvents(rawEvent: MeetupEvent): EventCreate {
  console.log('stand rawEvent');
  console.log(rawEvent);

  let { title, eventUrl, description, dateTime, duration, venue } = rawEvent;
  venue = venue ?? {}; // handle undefined venue
  const {
    name: venueName,
    address: addressLine1,
    city,
    state,
    lat,
    lng: long,
    country,
    postalCode: zip,
  } = venue;

  return {
    locationData: {
      addressLine1: addressLine1,
      city,
      state,
      lat,
      long,
      country,
      zip,
    },
    eventData: {
      source: 'SERPAPI',
      description: description + '\n' + eventUrl,
      start: dateTime,
      end: undefined, // TODO: parse the duration and turn that into an end date
      title: title,
      venueName,
    },
  };
}

export function standardizeTicketMasterEvents(
  rawEvent: TicketMasterEvent
): EventCreate {
  const { name: title, url, locale, dates, type, _embedded } = rawEvent;
  const { start, status, spanMultipleDays } = dates;
  const { localDate, localTime } = start;
  const { venues, attractions } = _embedded ?? {};
  const {
    name: venueName,
    id,
    postalCode,
    timezone,
    city,
    state,
    country,
    address,
    location,
  } = venues && venues?.length > 0
    ? venues[0]
    : {
        name: undefined,
        id: undefined,
        postalCode: undefined,
        timezone: undefined,
        city: undefined,
        state: undefined,
        country: undefined,
        address: undefined,
        location: undefined,
      }; // TODO: filter for correct venue here somehow

  return {
    locationData: {
      long: Number(location?.longitude),
      lat: Number(location?.latitude),
      addressLine1: address?.line1,
      city: city?.name,
      state: state?.stateCode,
    },
    eventData: {
      source: 'TICKETMASTER',
      description: title + '\n' + url,
      start: localDate,
      end: localDate, // TODO: incorporate the time value
      title: title,
    },
  };
}

export function snakeCaseKeys(obj: any) {
  return _.mapKeys(obj, _.rearg(_.snakeCase, 1));
}

export function camelCaseKeys(obj: any) {
  return _.mapKeys(obj, _.rearg(_.camelCase, 1));
}
