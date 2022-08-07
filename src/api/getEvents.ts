import { CalendarEvent } from '@prisma/client';
import { prismaClient } from '../prisma/client';
import { eventKeywordSearch } from './sql';

export default async function getEvents(
  location: any,
  query: string,
  categoryPreferences: any[]
): Promise<CalendarEvent[]> {
  return prismaClient.$queryRaw(eventKeywordSearch(query));
}
