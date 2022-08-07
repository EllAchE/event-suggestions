// Receives a request with preferences, date etc. and returns

import { Event } from '@prisma/client';
import { Request, Response } from 'express';
import { app } from './constants';
import getEvents from './getEvents';

// https://serpapi.com/search.json?q=events+in+Austin&google_domain=google.com&gl=us&hl=en&api_key=ae432bb4eade9985f9af2cd8d94a411516a216b598a697992b4f9bbe150c832f

app.get('/events', async (req: Request, res: Response) => {
  const { location, query } = req.body;

  const events: Event[] = await getEvents(location, query, []);

  res.json({ events });
});

app.get('/events/cached/');
