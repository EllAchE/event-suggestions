import { querySerpApi } from '../api/dataSources';
import { upsertAddressSerp } from '../api/sql';
import { checkQueryIsStale } from '../api/testQuery';
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

export async function retrieveAndSaveEvents(
  geography: GeoPoint,
  preferences: any
) {
  let queryId: number | null = await checkQueryIsStale(geography, preferences);
  if (!queryId) {
    const createdQuery = prismaClient.query.create({
      ...preferences,
      location,
    });
    queryId = (await createdQuery).id;
    const serpEvents = saveSerpApi(geography, queryId);
    // TODO: support other event formats
  }
  return prismaClient.calendar_event.findMany({
    where: {
      query_id: queryId,
    },
  });
}

async function saveSerpApi(location: GeoPoint, queryId: number): Promise<void> {
  const query = `Events in ${location.id}`;

  async function serpSaveCallback(serpResponse: any) {
    const events: any[] = serpResponse['events_results'];

    const mappedEvents: EventCreate[] = events.map((rawEvent: any) => {
      const { title, date, address, link, thumbnail } = rawEvent;

      return {
        title: title,
        location: {
          addressLine1: address[0],
          city: address[1],
          stage: address[2],
        },
        source: 'SERPAPI',
        description: title + '\n' + link,
        start: date?.start_date,
        end: date?.start_date,
      };
    });

    console.log('mappedEvents');
    console.log(mappedEvents);

    for (const event of mappedEvents) {
      const { addressLine1, city, state } = event.location;
      const loc: any = await prismaClient.$queryRaw(
        upsertAddressSerp(addressLine1, city, state)
      );

      await prismaClient.calendar_event.createMany({
        data: { ...event, location_id: loc.id, query_id: queryId },
      });
    }
  }

  querySerpApi(query, serpSaveCallback); // works with callback so save has to be done internally
}
