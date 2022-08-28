export type UrlParam = {
  key: string;
  value?: string;
};

export type GeoPoint = {
  id: string;
  lat?: number;
  long?: number;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
};

export type Preferences = {
  suggestEvents: boolean;
  suggestSports: boolean;
  suggestMusic: boolean;
  suggestComedy: boolean;
  suggestFamily: boolean;
};

export type Location = {
  country?: string;
  addressLine1?: string;
  addressLine2?: string;
  lat?: number;
  long?: number;
  zip?: number;
  state?: string;
  city?: string;
};

type EventData = {
  title: string;
  description: string;
  start: any;
  end: any;
  source: string;
  venueName?: string;
};

type LocationData = {
  addressLine1?: string;
  city?: string;
  state?: string;
  lat?: number;
  long?: number;
  zip?: string;
  country?: string;
};

export type EventCreate = {
  eventData: EventData;
  locationData: LocationData;
};

type EventRecurrence = {
  interval: number;
  type: string;
  dayOfWeek: string;
  dayOfMonth: string;
  dayOfYear: string;
};

// https://developers.google.com/calendar/api/v3/reference/events/insert
export type GoogleCalendarEvent = {
  end: { dateTime?: string; date?: string };
  start: { dateTime?: string; date?: string };
  startTime?: string;
  endTime?: string;
  title?: string;
  description?: string;
  dateFormat?: string;
  timeFormat?: string;
  recurrence?: EventRecurrence;
  attendees?: any[];
  summary: string;
  location: string;
  status?: 'tentative' | 'cancelled' | 'confirmed';
};
