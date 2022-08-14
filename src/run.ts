import { app, port } from './api/constants';
import { Request, Response } from 'express';
//import getEvents from './api/getEvents';
import { calendar_event } from '@prisma/client';
import { searchEvents } from './api/getEvents';

app.listen(port, (req: any, res: any) => {
  console.log('connected');
});

app.get('/', (req: any, res: any) => {
  console.log('cTEST');
});

app.get('/events/search', async (req: Request, res: Response) => {
  const { query } = req.body;

  const events: calendar_event[] = await searchEvents(query);

  res.json({ events });
});
