import { app, port } from './api/constants';
import { Request, Response } from 'express';
//import getEvents from './api/getEvents';
import { calendar_event } from '@prisma/client';
import { searchEvents } from './api/getEvents';
import { retrieveAndSaveEvents } from './jobs/saveEvents';

app.listen(port, (req: any, res: any) => {
  console.log('connected');
});

app.get('/', (req: any, res: any) => {
  console.log('Hit base URL');
});

app.get('/events/search', async (req: Request, res: Response) => {
  const { query } = req.body;

  const events: calendar_event[] = await searchEvents(query);

  res.json({ events });
});

app.put('/events/preferences', async (req: Request, res: Response) => {
  try {
    const { location, preferences } = req.body;

    const events: calendar_event[] | undefined = await retrieveAndSaveEvents(
      location,
      preferences
    );

    console

    res.json({ events });
  } catch (err: any) {
    console.error(err);
    res.sendStatus(500);
  }
});
