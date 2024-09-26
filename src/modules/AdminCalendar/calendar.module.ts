import { Module } from '@nestjs/common';
import { LoggerClientServicesTrx } from '../../shared/logger/logger.client';
import { MongoAdminRefService } from './infra/db/mongoServices';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarAdminController } from './infra/controllers/CalendarAdmin.controller';
import {
  CalendarAdminEvent,
  CalendarAdminEventSchema,
} from './infra/db/calendarEvents.schema';
import { CalendarAdminService } from './application/calendarAdmin.usecase';
import { CalendarEventRefService } from '../RefCalendar/application/calendarRef.usecase';
import { MongoServiceRef } from '../RefCalendar/infra/db/mongoServices';
import {
  CalendarRefEvent,
  CalendarRefEventSchema,
} from '../RefCalendar/infra/db/calendarRefEvents.schema';
import {
  RegisterRef,
  RegisterRefSchema,
} from '../registerRef/infra/db/registerRef.schema';
import { NotificationAdminController } from './infra/controllers/CalendarNotification.controller';
import { NotificationService } from './application/notification.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CalendarAdminEvent.name, schema: CalendarAdminEventSchema },
      { name: CalendarRefEvent.name, schema: CalendarRefEventSchema },
      { name: RegisterRef.name, schema: RegisterRefSchema },
    ]),
  ],
  controllers: [CalendarAdminController, NotificationAdminController],
  providers: [
    LoggerClientServicesTrx,
    CalendarAdminService,
    NotificationService,
    { provide: 'CalendarAdminService', useClass: MongoAdminRefService },
    { provide: 'CalendarEventRefService', useClass: MongoServiceRef },
  ],
  exports: [],
})
export class CalendarAdmintEventModule {}
