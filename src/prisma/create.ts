import { EventCreate, GeoPoint } from '../utils/types/common';
import { location } from '@prisma/client';
import { prismaClient } from './client';
import { snakeCaseKeys } from '../utils/utils';

export async function saveStandardizedEventToDb(
  event: EventCreate,
  queryId: number
) {
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
      ...snakeCaseKeys(locationData),
    },
  });
  console.log('id of loc', loc);

  await prismaClient.calendar_event.create({
    data: { ...eventData, location_id: loc.id, query_id: queryId },
  });
}

export async function saveQueryToDb(
  preferences: any,
  geography: GeoPoint,
  queryId: number
) {
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
  return queryId;
}
