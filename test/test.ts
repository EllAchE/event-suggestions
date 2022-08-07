import { queryMeetup, queryTicketMaster } from '../src/api/dataSources';

test('pulls data from sources', async () => {
  //const serpResults = querySerpApi()
  const meetupResults = await queryMeetup('', 37.7749, 122.4194);
  const tmResults = await queryTicketMaster(
    [{ key: 'postalCode', value: '94103' }],
    1
  );
  console.log(meetupResults);
  console.log(tmResults);
});
