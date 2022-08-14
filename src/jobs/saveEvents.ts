import { location } from '@prisma/client';
import { querySerpApi } from '../api/dataSources';
import { upsertAddressSerp } from '../api/sql';
import { checkQueryIsStale } from '../api/testQuery';
import { prismaClient } from '../prisma/client';
import { standardizeEvents } from '../utils';
import { EventCreate, GeoPoint } from '../utils/types';

const testgl = {
  id: 'San Francisco',
  lat: 37.773972,
  long: -122.431297,
  state: 'CA',
  country: 'USA',
  city: 'San Francisco',
};

export async function retrieveAndSaveEvents(
  geography: GeoPoint,
  preferences: any
) {
  let queryId: number | null = await checkQueryIsStale(geography, preferences);
  if (!queryId) {
    const createdQuery = prismaClient.query.create({
      data: {
        ...preferences,
        location: {
          create: {
            ...geography,
          },
        },
      },
    });
    queryId = (await createdQuery).id;

    try {
      const serpEvents = await saveSerpApi(geography, queryId);
      // TODO: support other event formats
      console.dir(serpEvents);
    } catch (err: any) {
      console.error(err);
    }
  }

  console.dir('getting events');
  return prismaClient.calendar_event.findMany({
    where: {
      query_id: queryId,
    },
  });
}

async function saveSerpApi(location: GeoPoint, queryId: number): Promise<void> {
  console.info('Fetching serp api events for location', location);
  const query = `Events in ${location.city}`;
  //const query = `Events in Austin`;

  async function serpSaveCallback(serpResponse: any): Promise<void> {
    const events: any[] = serpResponse['events_results'];

    console.dir('serpResponse');
    console.dir(serpResponse);
    console.dir(events);

    if (!events) {
      return; // Early exit if the query yields no event results
    }

    const mappedEvents: EventCreate[] = events.map(standardizeEvents);

    for (const event of mappedEvents) {
      const { locationData, eventData } = event;
      const { addressLine1, city, state } = locationData ?? {};
      const loc: location = await prismaClient.location.upsert({
        where: {
          city_state_address_line_1: {
            city,
            state: state ? state : '',
            address_line_1: addressLine1,
          },
        },
        update: {},
        create: {
          city,
          state,
          address_line_1: addressLine1,
        },
      });
      console.log('id of loc', loc);

      await prismaClient.calendar_event.create({
        data: { ...eventData, location_id: loc.id, query_id: queryId },
      });
    }
  }

  await querySerpApi(query, serpSaveCallback); // works with callback so save has to be done internally
}
