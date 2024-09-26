export interface DataBaseAdminI {
  addEvent?: (data: any) => any;
  deleteEvent?: (id: string) => any;
  getEvent?: (id: string) => any;
  getAllEvents?: () => any;
  getAllEventsForDate?: (date: any) => any;
  updateEvent?: (id: string, data: any) => any;
  addRefToEvent?: (id: string, user: string) => any;
  approveEventToRef: (body: any) => any;
}
