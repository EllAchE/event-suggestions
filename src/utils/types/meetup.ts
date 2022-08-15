export interface MeetupEvent {
  id?: string;
  token?: string;
  title: string;
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
