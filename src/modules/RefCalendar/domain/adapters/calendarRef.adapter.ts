import { getEventI } from '../interfaces/calendarDataReq.interface';

export const postResponseAdapter = (data: any) => {
  return {
    id: data['_id'],
    user: data['user'],
    date: data['date'],
    state: data['state'],
    event: data['event'],
    arriveTime: data['arriveTime'] || '',
    leaveTime: data['leaveTime'] || '',
    observations: data['observations'] || '',
    finished: data['finished'],
    name: data['name'],
  };
};
