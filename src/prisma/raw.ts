import { calendar_event } from '@prisma/client';
import { eventKeywordSearch } from '../utils/sql';
import { prismaClient } from './client';

export async function searchEvents(query: string): Promise<calendar_event[]> {
  return prismaClient.$queryRaw(eventKeywordSearch(query));
}
