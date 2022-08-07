import { Location } from '@prisma/client';
import { querySerpApi } from '../api/dataSources';
import { upsertAddressSerp } from '../api/sql';
import { prismaClient } from '../prisma/client';
import { EventCreate, GeoPoint } from '../utils/types';

const testgl = {
  id: 'San Francisco',
  lat: 37.773972,
  long: -122.431297,
  state: 'CA',
  country: 'USA',
  city: 'San Francisco',
};

export function saveEvents() {
  saveEventsForGeography(testgl);
}

export function saveEventsForGeography(location: GeoPoint) {}

function saveSerpApi(location) {
  const query = `Events in ${location.id}`;

  function serpSaveCallback(serpResponse: any) {
    const events: any[] = serpResponse['events_results'];

    const mappedEvents: EventCreate[] = events.map((rawEvent: any) => {
      const { title, date, address, link, thumbnail } = rawEvent;

      return {
        title: title,
        location: {
          addressLine1: location[0],
          city: location[1],
          stage: location[2],
        },
        source: 'SERPAPI',
        description: title + '\n' + link,
        start: date?.start_date,
        end: date?.start_date,
      };
    });

    for (const event of mappedEvents) {
      const { addressLine1, city, state } = event.location;
      prismaClient
        .$queryRaw(upsertAddressSerp(addressLine1, city, state))
        .then((loc: any) => {
          prismaClient.calendarEvent.createMany({
            data: { ...event, locationId: loc.id },
          });
        });
    }
  }

  querySerpApi(query, serpSaveCallback); // works with callback so save has to be done internally
}
