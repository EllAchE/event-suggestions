export type Param = {
  key: string;
  value: string;
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
};

type LocationData = {
  addressLine1: string;
  city: string;
  state: string;
};

export type EventCreate = {
  eventData: EventData;
  locationData: LocationData;
};

export interface MeetupEvent {
  id?: string;
  token?: string;
  title?: string;
  eventUrl?: string;
  description?: string;
  shortDescription?: null;
  host?: Host;
  howToFindUs?: null;
  group?: Group;
  venue?: Venue;
  images?: (null[] | null)[] | null;
  onlineVenue?: OnlineVenue;
  status?: string;
  timeStatus?: string;
  dateTime?: string;
  duration?: string;
  timezone?: string;
  endTime?: string;
  createdAt?: null;
  priceTier?: string;
  fees?: null;
  taxType?: null;
  donation?: null;
  maxTickets?: number;
  waitlistMode?: string;
  going?: number;
  waiting?: number;
  eventType?: string;
  isOnline?: boolean;
  isNetworkEvent?: boolean;
  image?: Image;
  shortUrl?: string;
  hosts?: (null[] | null)[] | null;
  topics?: Topics;
  zoomMeetingId?: null;
}
export interface Host {
  name?: string;
  username?: string;
  city?: null;
  country?: null;
  bio?: null;
}
export interface Group {
  logo?: null[] | null;
  isPrivate?: boolean;
  latitude?: number;
  longitude?: number;
  description?: string;
  name?: string;
  city?: string;
  state?: string;
  country?: string;
  link?: string;
  groupPhoto?: null[] | null;
}
export interface Venue {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  lat?: number;
  lng?: number;
  country?: string;
}
export interface OnlineVenue {
  url?: null;
}
export interface Image {
  baseUrl?: string;
}
export interface Topics {
  edges?: null[] | null;
  count?: number;
}
export interface SerpApiEvent {
  title?: string;
  date?: SerpDate;
  address?: string[] | null;
  link?: string;
  thumbnail?: string;
}
export interface SerpDate {
  start_date?: string;
  when?: string;
}
