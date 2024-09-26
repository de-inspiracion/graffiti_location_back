import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  addEventI,
  getEventI,
} from '../domain/interfaces/calendarDataReq.interface';
import { postResponseAdapter } from '../domain/adapters/calendar.adapter';
import { CalendarAdminDataResp } from '../domain/interfaces/calendarAdminDataResp.interface';
import { DataBaseAdminI } from '../domain/interfaces/databaseCalendarAdmin.interface';
import { eventToRef } from '../infra/DTOs/calendarAdminEvent.dto';
import { DataBaseRefEventI } from 'src/modules/RefCalendar/domain/interfaces/databaseCalendarRef.interface';
import { Notification } from 'src/services/notification/notification';
import { StatesEnum } from 'src/modules/registerRef/infra/enums/states.enum';
@Injectable()
export class CalendarAdminService {
  private readonly NAME = 'CalendarAdminService';
  private logger: Logger = new Logger(CalendarAdminService.name);
  notification: Notification;
  constructor(
    @Inject('CalendarAdminService') private services: DataBaseAdminI,
    @Inject('CalendarEventRefService') private servicesRef: DataBaseRefEventI,
  ) {
    this.notification = new Notification();
  }

  async addEvent(data: addEventI): Promise<CalendarAdminDataResp> {
    data.country = data.country.toUpperCase();
    data.city = data.city.toUpperCase();
    const response = await this.services.addEvent(data);
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }

  async approveEventToRef(body: eventToRef): Promise<CalendarAdminDataResp> {
    const response = await this.services.approveEventToRef(body);
    await this.servicesRef.changeStateEvent(body.ref, body.state, body.event);
    const topic = body.ref.replace(/@/g, '-');
    const notificationState =
      StatesEnum[body.state].toLowerCase() === 'approved'
        ? 'aprobada'
        : 'rechazada';
    const NotificationBody = 'tu solicitud ha sido ' + notificationState;
    await this.notification.sendNotification(
      'Solicitud de partido',
      NotificationBody,
      topic,
    );
    return { status: 'ok', payload: response };
  }

  async deleteEvent(id: string): Promise<CalendarAdminDataResp> {
    const response = await this.services.deleteEvent(id);
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }

  async getAllEventsForDate(body: getEventI): Promise<CalendarAdminDataResp> {
    body.country = body.country.toUpperCase();
    body.city = body.city.toUpperCase();
    const response = await this.services.getAllEventsForDate(body);
    const arrayData = this.getArrayData(response);
    return { status: 'ok', payload: arrayData };
  }

  async updateEvent(
    id: string,
    data: addEventI,
  ): Promise<CalendarAdminDataResp> {
    const response = await this.services.updateEvent(id, data);
    const adapterResponse = postResponseAdapter(response);
    return { status: 'ok', payload: adapterResponse };
  }

  async addRefToEvent(body: eventToRef): Promise<CalendarAdminDataResp> {
    return this.services.addRefToEvent(body.event, body.ref);
  }

  getArrayData(response: [any]) {
    const arrayData = [];
    response.forEach((element) => {
      const adapterResponse = postResponseAdapter(element);
      arrayData.push(adapterResponse);
    });
    return arrayData;
  }
}
