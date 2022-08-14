import { calendar_event, query } from '@prisma/client';
import { prismaClient } from '../prisma/client';
import { eventKeywordSearch } from './sql';

export async function searchEvents(query: string): Promise<calendar_event[]> {
  return prismaClient.$queryRaw(eventKeywordSearch(query));
}

export async function checkQueryIsStale(
  location: any,
  categoryPreferences: any
): Promise<number | null> {
  const res: query = await prismaClient.query.findFirst({
    where: {
      location: {
        ...location,
      },
      ...categoryPreferences,
    },
  });

  return res.id ?? null;
}
