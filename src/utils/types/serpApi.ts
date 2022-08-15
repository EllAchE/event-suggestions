export interface SerpApiEvent {
  title: string;
  date?: SerpDate;
  address: string[];
  link?: string;
  thumbnail?: string;
}
export interface SerpDate {
  start_date?: string;
  when?: string;
}
