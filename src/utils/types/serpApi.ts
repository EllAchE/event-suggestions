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