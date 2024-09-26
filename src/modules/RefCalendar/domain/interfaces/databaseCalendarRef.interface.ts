import { addEventI } from './calendarDataReq.interface';

export interface DataBaseRefEventI {
  addEvent?: (data: addEventI) => any;
  deleteEvent?: (id: string) => any;
  getEvent?: (id: string) => any;
  getAllEvents?: () => any;
  getAllEventsForDate?: (date: any) => any;
  updateEvent?: (id: string, data: any) => any;
  changeStateEvent?: (id: string, state: string, event: string) => any;
  addObservations?: (id: string, data: any) => any;
  finishEvent?: (id: string) => any;
  myEvents?: (data: any) => any;
}
