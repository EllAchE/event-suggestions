import { query } from '@prisma/client';
import { GeoPoint, Preferences } from '../utils/types/common';
import { prismaClient } from './client';

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

export async function checkQueryIsStale(
  location: any,
  categoryPreferences: Preferences
): Promise<number | null> {
  const res: query | null = await prismaClient.query.findFirst({
    where: {
      location: {
        ...location,
      },
      ...categoryPreferences,
    },
  });

  return res?.id ?? null;
}
