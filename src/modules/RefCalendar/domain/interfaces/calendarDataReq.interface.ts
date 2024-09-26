import { StatesEvent } from 'src/shared/enums/states';

export interface addEventI {
  state: StatesEvent;
  date: string;
  event: string;
  user: string;
}

export interface getEventI {
  day: string;
  month: string;
  year: string;
  user: string;
}
