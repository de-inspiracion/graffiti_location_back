import { getEventI } from '../interfaces/calendarDataReq.interface';

export const postResponseAdapter = (data: getEventI) => {
  return {
    id: data['_id'],
    name: data['name'],
    date: data['date'],
    active: data['active'],
    stadium: data['stadium'],
    available: data['available'],
    refs: data['refs'],
    field: data['field'],
    arriveTime: data['arriveTime'],
    leaveTime: data['leaveTime'],
    observations: data['observations'],
  };
};
