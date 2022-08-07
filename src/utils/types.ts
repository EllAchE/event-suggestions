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

export type EventCreate = {
  title: string;
  description: string;
  start: any;
  end: any;
  source: string;
  location?: Location;
};
