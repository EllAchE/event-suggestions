import { EventCreate } from './utils/types';

export function tryCatchWrapper(fn: any, params: any): void {
  try {
    fn(...params);
  } catch (err: any) {
    console.error(err);
  }
}

export function standardizeEvents(rawEvent: any): EventCreate {
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
