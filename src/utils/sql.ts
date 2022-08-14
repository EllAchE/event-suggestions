import { Prisma } from '@prisma/client';

export const eventKeywordSearch = (keyword: string) => {
  return Prisma.sql`SELECT * 
FROM EVENT
WHERE title LIKE ${keyword}
OR description LIKE ${keyword}
`;
};

// https://towardsdatascience.com/postgresql-how-to-upsert-safely-easily-and-fast-246040514933
// https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access
export const upsertAddressSerp = (addressLine1: any, city: any, state: any) => {
  console.log('received args set', addressLine1, city, state);
  return Prisma.sql`INSERT INTO "location" (address_line_1, city, state) VALUES
	(${addressLine1}, ${city}, ${state})
    ON CONFLICT
    DO NOTHING;`;
};
