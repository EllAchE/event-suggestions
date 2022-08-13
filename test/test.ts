import { Prisma } from '@prisma/client';
import { queryMeetup, queryTicketMaster } from '../src/api/dataSources';
import { saveEventsForGeography } from '../src/jobs/saveEvents';
import { prismaClient } from '../src/prisma/client';

test('cron saves to database', async () => {
  const testgl = {
    id: 'San Francisco',
    lat: 37.773972,
    long: -122.431297,
    state: 'CA',
    country: 'USA',
    city: 'San Francisco',
  };

  await saveEventsForGeography(testgl);
});

// test('pulls data from sources', async () => {
//   //const serpResults = querySerpApi()
//   const meetupResults = await queryMeetup('', 37.7749, 122.4194);
//   const tmResults = await queryTicketMaster(
//     [{ key: 'postalCode', value: '94103' }],
//     1
//   );
//   console.log(meetupResults);
//   console.log(tmResults);
// });

// test('see db', async () => {
//   console.log(await prismaClient.location.findFirst());
//   //const res = await prismaClient.$queryRaw(Prisma.sql`SELECT * FROM *`);
//   //console.log(res);
// });
