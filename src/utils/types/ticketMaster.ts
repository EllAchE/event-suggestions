export interface TicketMasterEvent {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images?: ImagesEntity[] | null;
  sales: Sales;
  dates: Dates;
  classifications?: ClassificationsEntity[] | null;
  promoter: PromotersEntityOrPromoter;
  promoters?: PromotersEntityOrPromoter[] | null;
  outlets?: OutletsEntity[] | null;
  seatmap: Seatmap;
  _links: Links;
  _embedded: Embedded;
}
export interface ImagesEntity {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}
export interface Sales {
  public: Public;
}
export interface Public {
  startDateTime: string;
  startTBD: boolean;
  startTBA: boolean;
  endDateTime: string;
}
export interface Dates {
  start: Start;
  status: Status;
  spanMultipleDays: boolean;
}
export interface Start {
  localDate: string;
  localTime: string;
  dateTime: string;
  dateTBD: boolean;
  dateTBA: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
}
export interface Status {
  code: string;
}
export interface ClassificationsEntity {
  primary: boolean;
  segment: NameAndId;
  genre: NameAndId;
  subGenre: NameAndId;
  family: boolean;
}
export interface NameAndId {
  id: string;
  name: string;
}
export interface PromotersEntityOrPromoter {
  id: string;
  name: string;
  description: string;
}
export interface OutletsEntity {
  url: string;
  type: string;
}
export interface Seatmap {
  staticUrl: string;
}
export interface Links {
  self: Href;
  attractions?: Href[] | null;
  venues?: Href[] | null;
}
export interface Href {
  href: string;
}
export interface Embedded {
  venues?: VenuesEntity[] | null;
  attractions?: AttractionsEntity[] | null;
}
export interface VenuesEntity {
  name: string;
  type: string;
  id: string;
  test: boolean;
  locale: string;
  postalCode: string;
  timezone: string;
  city: City;
  state: State;
  country: Country;
  address: Address;
  location: Location;
  dmas?: DmasEntity[] | null;
  upcomingEvents: UpcomingEvents;
  _links: Links1;
}
export interface City {
  name: string;
}
export interface State {
  name: string;
  stateCode: string;
}
export interface Country {
  name: string;
  countryCode: string;
}
export interface Address {
  line1: string;
}
export interface Location {
  longitude: string;
  latitude: string;
}
export interface DmasEntity {
  id: number;
}

export interface Links1 {
  self: Href;
}
export interface AttractionsEntity {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url?: string | null;
  locale: string;
  externalLinks?: ExternalLinks | null;
  images?: ImagesEntity[] | null;
  classifications?: Classifications[] | null;
  upcomingEvents: UpcomingEvents;
  _links: Links1;
}
export interface ExternalLinks {
  youtube?: LinkEntity[] | null;
  twitter?: LinkEntity[] | null;
  itunes?: LinkEntity[] | null;
  lastfm?: LinkEntity[] | null;
  facebook?: LinkEntity[] | null;
  wiki?: LinkEntity[] | null;
  spotify?: LinkEntity[] | null;
  instagram?: LinkEntity[] | null;
  musicbrainz?: MusicbrainzEntity[] | null;
  homepage?: LinkEntity[] | null;
}
export interface LinkEntity {
  url: string;
}
export interface MusicbrainzEntity {
  id: string;
}
export interface Classifications {
  primary: boolean;
  segment: NameAndId;
  genre: NameAndId;
  subGenre: NameAndId;
  type?: NameAndId | null;
  subType?: NameAndId | null;
  family: boolean;
}

export interface NameAndId {
  id: string;
  name: string;
}

export interface UpcomingEvents {
  _total: number;
  tmr: number;
  'mfx-za'?: number | null;
  ticketmaster: number;
  _filtered: number;
  'mfx-de'?: number | null;
}
