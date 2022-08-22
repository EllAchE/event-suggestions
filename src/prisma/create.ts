import { EventCreate, GeoPoint, Preferences } from '../utils/types/common';
import { location } from '@prisma/client';
import { prismaClient } from './client';
import { snakeCaseKeys } from '../utils/utils';

export async function saveStandardizedEventToDb(
  event: EventCreate,
  queryId: number
) {
  const { locationData, eventData } = event;
  const { addressLine1, city, state } = locationData ?? {};
  const obj: any = {
    city: city ?? '',
    state: state ?? '',
    address_line_1: addressLine1 ?? '',
  };
  console.log('contents of obj');
  console.dir(obj);
  const loc: location = await prismaClient.location.upsert({
    where: {
      city_state_address_line_1: obj,
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
  preferences: Preferences | any,
  geography: GeoPoint
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
  return (await createdQuery).id;
}
