import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  addEventI,
  getEventI,
} from '../domain/interfaces/calendarDataReq.interface';
import { postResponseAdapter } from '../domain/adapters/calendarRef.adapter';
import { CalendarRefDataResp } from '../domain/interfaces/calendarRefDataResp.interface';
import { DataBaseRefEventI } from '../domain/interfaces/databaseCalendarRef.interface';
import { DataBaseAdminI } from 'src/modules/AdminCalendar/domain/interfaces/databaseCalendarAdmin.interface';
import { ObservationI } from '../domain/interfaces/observations.interface';
import { myEventsDTO } from '../infra/DTOs/calendarAdminEvent.dto';
import { MyEvents } from '../domain/interfaces/myEvents.interface';
import { Notification } from 'src/services/notification/notification';
@Injectable()
export class CalendarEventRefService {
  private readonly NAME = 'CalendarEventRefService';
  private logger: Logger = new Logger(CalendarEventRefService.name);
  notification;
  constructor(
    @Inject('CalendarEventRefService') private services: DataBaseRefEventI,
    @Inject('CalendarAdminService') private servicesAdmin: DataBaseAdminI,
  ) {
    this.notification = new Notification();
  }

  async addEvent(data: addEventI): Promise<CalendarRefDataResp> {
    const response = await this.services.addEvent(data);
    const topic = data.user.replace(/@/g, '-');
    await this.notification.sendNotification(
      'Solicitud de evento',
      'Te avisaremos cuando tu solicitud de evento haya sido aprobada',
      topic,
    );
    await this.notification.sendNotification(
      'Solicitud de evento',
      `El usuario ${data.user} ha solicitado un evento, revisa la solicitud en la app`,
      'admin-ref',
    );
    await this.servicesAdmin.addRefToEvent(data.event, data.user);
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }

  async changeStateEvent(
    ref: string,
    state: string,
    event: string,
  ): Promise<CalendarRefDataResp> {
    const response = await this.services.changeStateEvent(ref, state, event);
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }
  async deleteEvent(id: string): Promise<CalendarRefDataResp> {
    const response = await this.services.deleteEvent(id);
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }

  async getAllEventsForDate(body: getEventI): Promise<CalendarRefDataResp> {
    const response = await this.services.getAllEventsForDate(body);
    const arrayData = this.getArrayData(response);
    return { status: 'ok', payload: arrayData };
  }

  async updateEvent(id: string, data: addEventI): Promise<CalendarRefDataResp> {
    const response = await this.services.updateEvent(id, data);
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }

  async addObservations(
    id: string,
    data: ObservationI,
  ): Promise<CalendarRefDataResp> {
    const response = await this.services.addObservations(id, data);
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }

  getArrayData(response: [any]) {
    const arrayData = [];
    response.forEach((element) => {
      const adapterResponse = postResponseAdapter(element);
      arrayData.push(adapterResponse);
    });
    return arrayData;
  }

  async finishEvent(id: string) {
    const response = await this.services.finishEvent(id);
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }

  async myevents(data: MyEvents) {
    const response = await this.services.myEvents(data);
    const arrayData = [];
    response.forEach((element) => {
      const adapterResponse = postResponseAdapter(element);
      arrayData.push(adapterResponse);
    });
    return { status: 'ok', payload: arrayData };
  }

  async getEvent(id: string) {
    const response = await this.services.getEvent(id);
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }
}
