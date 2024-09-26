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
export class NotificationService {
  private readonly NAME = 'CalendarAdminService';
  private logger: Logger = new Logger(NotificationService.name);
  notification: Notification = new Notification();
  constructor(
    @Inject('CalendarAdminService') private services: DataBaseAdminI,
    @Inject('CalendarEventRefService') private servicesRef: DataBaseRefEventI,
  ) {}

  async sendNotificationPush(data): Promise<any> {
    const topic = data.topic;
    await this.notification.sendNotification(data.title, data.body, topic);
    return { status: 'ok' };
  }
}
