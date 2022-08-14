import { mapKeys, rearg, snakeCase, camelCase } from 'lodash';
import { EventCreate } from './types/common';
import { MeetupEvent } from './types/meetup';
import { SerpApiEvent } from './types/serpApi';

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

  const { title, eventUrl, description, dateTime, duration, venue } = rawEvent;
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
      addressLine1,
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

export function snakeCaseKeys(obj: any) {
  return mapKeys(obj, rearg(snakeCase, 1));
}

export function camelCaseKeys(obj: any) {
  return mapKeys(obj, rearg(camelCase, 1));
}
