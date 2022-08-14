import { upsertAddressSerp } from '../utils/sql';
import { prismaClient } from '../prisma/client';
import { saveQueryToDb, saveStandardizedEventToDb } from '../prisma/create';
import {
  standardizeMeetupEvents,
  standardizeSerpapiEvents,
} from '../utils/utils';
import { EventCreate, GeoPoint } from '../utils/types/common';
import querySerpApi from '../data-retrieval/querySerpApi';
import queryMeetup from '../data-retrieval/queryMeetup';
import { checkQueryIsStale } from '../prisma/find';
import queryTicketMaster from '../data-retrieval/queryTicketMaster';
import { TicketMasterEvent } from '../utils/types/ticketMaster';
import { MeetupEvent } from '../utils/types/meetup';

export async function retrieveAndSaveEvents(
  geography: GeoPoint,
  preferences: any
) {
  let queryId: number | null = await checkQueryIsStale(geography, preferences);
  if (!queryId) {
    queryId = await saveQueryToDb(preferences, geography, queryId);

    try {
      //const serpEvents = await saveSerpApi(geography, queryId);
      //const meetupEvents = await saveMeetup(geography, queryId);
      const ticketMasterEvents = await saveTicketMaster(geography, queryId);
      console.dir(ticketMasterEvents);
      //console.dir(serpEvents);
      //console.dir(meetupEvents);
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

    const mappedEvents: EventCreate[] = events.map(standardizeSerpapiEvents);

    for (const event of mappedEvents) {
      await saveStandardizedEventToDb(event, queryId);
    }
  }

  await querySerpApi(query, serpSaveCallback); // works with callback so save has to be done internally
}

async function saveMeetup(location: GeoPoint, queryId: number): Promise<void> {
  console.info('Fetching meetup api events for location', location);
  const query = `Events in ${location.city}`;
  //const query = `Events in Austin`;

  const res = await queryMeetup(location);
  console.dir(res.data);
  const events: MeetupEvent[] = res?.data?.data?.keywordSearch?.edges?.map(
    (item: any) => {
      return item.node.result;
    }
  ); //gql return result includes cursor and node

  console.dir('meetup res');
  console.dir(events);

  if (!events) {
    return; // Early exit if the query yields no event results
  }

  const mappedEvents: EventCreate[] = events.map(standardizeMeetupEvents);

  for (const event of mappedEvents) {
    saveStandardizedEventToDb(event, queryId);
  }
}

async function saveTicketMaster(
  location: GeoPoint,
  queryId: number
): Promise<void> {
  // pass url params f
  const { city, state, country, lat, long, zip } = location;
  const res = await queryTicketMaster([
    { key: 'zip', value: zip },
    { key: 'keyword', value: city },
  ]);

  const events: TicketMasterEvent[] = res?.data?.events;
}
