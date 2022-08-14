import { calendar_event } from '@prisma/client';
import { prismaClient } from '../prisma/client';
import { eventKeywordSearch } from './sql';

export async function searchEvents(query: string): Promise<calendar_event[]> {
  return prismaClient.$queryRaw(eventKeywordSearch(query));
}

export async function getEventsByPreferences(
  location: any,
  categoryPreferences: any
): Promise<calendar_event[]> {
  return prismaClient.calendar_event.findMany({
    where: {
      location: {
        ...location,
      },
      query: {
        ...categoryPreferences,
      },
    },
  });
}
