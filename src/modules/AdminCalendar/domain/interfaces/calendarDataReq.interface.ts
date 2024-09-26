export interface addEventI {
  name: string;
  date: string;
  country: string;
  city: string;
  active: boolean;
  stadium: string;
}

export interface getEventI {
  stadium: string;
  day: string;
  month: string;
  year: string;
  country: string;
  city: string;
  type: string;
}
