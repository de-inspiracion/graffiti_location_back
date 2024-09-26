import { Module } from '@nestjs/common';
import { LoggerClientServicesTrx } from '../../shared/logger/logger.client';
import { MongoServiceRef } from './infra/db/mongoServices';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarRefController } from './infra/controllers/CalendarRef.controller';
import {
  CalendarRefEvent,
  CalendarRefEventSchema,
} from './infra/db/calendarRefEvents.schema';
import { CalendarEventRefService } from './application/calendarRef.usecase';
import {
  CalendarAdminEvent,
  CalendarAdminEventSchema,
} from '../AdminCalendar/infra/db/calendarEvents.schema';
import { MongoAdminRefService } from '../AdminCalendar/infra/db/mongoServices';
import {
  RegisterRef,
  RegisterRefSchema,
} from '../registerRef/infra/db/registerRef.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CalendarRefEvent.name, schema: CalendarRefEventSchema },
      { name: CalendarAdminEvent.name, schema: CalendarAdminEventSchema },
      { name: RegisterRef.name, schema: RegisterRefSchema },
    ]),
  ],
  controllers: [CalendarRefController],
  providers: [
    LoggerClientServicesTrx,
    CalendarEventRefService,
    { provide: 'CalendarEventRefService', useClass: MongoServiceRef },
    { provide: 'CalendarAdminService', useClass: MongoAdminRefService },
  ],
  exports: [],
})
export class CalendarRefEventModule {}
