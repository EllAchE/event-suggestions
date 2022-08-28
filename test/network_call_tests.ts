import queryMeetup from '../src/data-retrieval/queryMeetup';
import queryTicketMaster from '../src/data-retrieval/queryTicketMaster';
import { retrieveAndSaveEvents } from '../src/jobs/saveEvents';
import { GeoPoint, Preferences } from '../src/utils/types/common';

test('cron saves to database', async () => {
  const testgl = {
    id: 'San Francisco',
    lat: 37.773972,
    long: -122.431297,
    state: 'CA',
    country: 'USA',
    city: 'San Francisco',
  };

  await retrieveAndSaveEvents(testgl, {} as Preferences);
});

test('pulls data from meetup', async () => {
  //const serpResults = querySerpApi()
  const meetupResults = await queryMeetup({} as GeoPoint, 37.7749, 122.4194);
  const tmResults = await queryTicketMaster(
    [{ key: 'postalCode', value: '94103' }],
    1
  );
  console.log(meetupResults);
  console.log(tmResults);
});
