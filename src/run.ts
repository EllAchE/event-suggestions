import { app, port } from './api/constants';
import { Request, Response } from 'express';
//import getEvents from './api/getEvents';
import { CalendarEvent } from '@prisma/client';
import getEvents from './api/getEvents';

app.listen(port, (req: any, res: any) => {
  console.log('connected');
});

app.get('/', (req: any, res: any) => {
  console.log('cTEST');
});

app.get('/events', async (req: Request, res: Response) => {
  const { location, query } = req.body;

  const events: CalendarEvent[] = await getEvents(location, query, []);

  res.json({ events });
});
