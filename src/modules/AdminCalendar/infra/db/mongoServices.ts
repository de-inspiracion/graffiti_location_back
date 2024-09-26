import { InjectModel } from '@nestjs/mongoose';
import { CalendarAdminEvent } from './calendarEvents.schema';
import { Model } from 'mongoose';
import { DataBaseAdminI } from '../../domain/interfaces/databaseCalendarAdmin.interface';
import { getEventI } from '../../domain/interfaces/calendarDataReq.interface';
import { StatesEnum } from 'src/modules/registerRef/infra/enums/states.enum';
import { eventToRef } from '../DTOs/calendarAdminEvent.dto';
import { CalendarRefEvent } from 'src/modules/RefCalendar/infra/db/calendarRefEvents.schema';
import { RegisterRef } from 'src/modules/registerRef/infra/db/registerRef.schema';
import { HttpException, HttpStatus } from '@nestjs/common';

export class MongoAdminRefService implements DataBaseAdminI {
  constructor(
    @InjectModel(CalendarAdminEvent.name)
    private calendarEvent: Model<CalendarAdminEvent>,
    @InjectModel(RegisterRef.name)
    private registerRef: Model<RegisterRef>,
  ) {}

  async addEvent(data: any): Promise<any> {
    return this.calendarEvent.create(data);
  }

  async addRefToEvent(id: string, user: string): Promise<any> {
    const event = await this.calendarEvent.findById(id);
    const ref = await this.registerRef.findOne({ email: user });
    if (event) {
      event.refs.push({ ref: user, name: ref.name, state: StatesEnum.pending });
      event.save();
    }
    return event;
  }

  async approveEventToRef(data: eventToRef): Promise<any> {
    const event = await this.calendarEvent.findById(data.event);
    if (!event.available) {
      throw new HttpException(
        { response: 'Event not available', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (event) {
      const index = event.refs.findIndex((ref: any) => ref.ref === data.ref);
      if (index !== -1) {
        // event.refs[index] = { state: StatesEnum[data.state], ref: data.ref };
        event.refs[index].state = StatesEnum[data.state];
        event.markModified('refs');
        const isAvailable = StatesEnum[data.state] === 'APPROVED';
        event.available = !isAvailable;
        event.save();
      }
    }
    return event;
  }

  async cancelEventToRef(data: eventToRef): Promise<any> {
    const event = await this.calendarEvent.findById(data.event);
    if (event) {
      const ref = event.refs.find((ref: any) => ref.ref === data.ref);
      if (ref) {
        ref.state = StatesEnum[data.state];
        event.available = true;
        event.save();
      }
    }
    return event;
  }
  async deleteEvent(id: string): Promise<any> {
    return this.calendarEvent.findByIdAndDelete(id);
  }

  async getEvent(id: string): Promise<any> {
    return this.calendarEvent.findById(id);
  }

  async getAllEvents(): Promise<any> {
    return this.calendarEvent.find();
  }

  async getAllEventsForDate(dateEvent: getEventI): Promise<any> {
    const startDate = new Date(
      Number(dateEvent.year),
      Number(dateEvent.month) - 1,
      1,
    );
    const endDate = new Date(
      Number(dateEvent.year),
      Number(dateEvent.month),
      1,
    );

    if (dateEvent.type === 'all') {
      return this.calendarEvent
        .find({
          date: { $gte: startDate, $lte: endDate },
          city: dateEvent.city,
          country: dateEvent.country,
        })
        .sort({ available: -1 })
        .sort({ date: 1 });
    }

    if (dateEvent.type === 'available') {
      return this.calendarEvent
        .find({
          date: { $gte: startDate, $lte: endDate },
          city: dateEvent.city,
          country: dateEvent.country,
          available: true,
        })
        .sort({ date: 1 });
    }
  }

  async updateEvent(id: string, data: any): Promise<any> {
    return this.calendarEvent.findByIdAndUpdate(id, data);
  }
}
