import { InjectModel } from '@nestjs/mongoose';
import { CalendarRefEvent } from './calendarRefEvents.schema';
import { Model } from 'mongoose';
import { DataBaseRefEventI } from '../../domain/interfaces/databaseCalendarRef.interface';
import {
  addEventI,
  getEventI,
} from '../../domain/interfaces/calendarDataReq.interface';
import { CalendarAdminEvent } from 'src/modules/AdminCalendar/infra/db/calendarEvents.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ObservationI } from '../../domain/interfaces/observations.interface';
import { MyEvents } from '../../domain/interfaces/myEvents.interface';
import { StatesEvent } from 'src/shared/enums/states';
import { Notification } from 'src/services/notification/notification';
export class MongoServiceRef implements DataBaseRefEventI {
  notification: Notification;
  constructor(
    @InjectModel(CalendarRefEvent.name)
    private calendarEvent: Model<CalendarRefEvent>,
    @InjectModel(CalendarAdminEvent.name)
    private calendarAdminEvent: Model<CalendarAdminEvent>,
  ) {
    this.notification = new Notification();
  }

  async addEvent(data: addEventI): Promise<any> {
    const existEvent = await this.calendarAdminEvent.findOne({
      _id: data.event,
      available: true,
    });
    if (!existEvent) {
      throw new HttpException(
        {
          message: {
            es: 'El evento no esta disponible',
            en: 'Event not available',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (await this.existsUserInEvent(data.user, data.event)) {
      throw new HttpException(
        {
          message: {
            es: 'No puedes participar en un evento que ya este asignado',
            en: 'You cannot participate in an event that is already assigned',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.calendarEvent.create(data);
  }

  async existsUserInEvent(user: string, event: string): Promise<boolean> {
    const existUserInEvent = await this.calendarAdminEvent.findOne({
      'refs.ref': user,
      _id: event,
    });
    if (existUserInEvent) {
      return true;
    }
    return false;
  }

  async changeStateEvent(
    ref: string,
    state: string,
    event: string,
  ): Promise<any> {
    const eventResult = await this.calendarEvent.findOne({ user: ref, event });
    if (eventResult) {
      eventResult.state = StatesEvent[state];
      eventResult.save();
    }
    return eventResult;
  }
  async deleteEvent(id: string): Promise<any> {
    const resultDelete = await this.calendarEvent.findByIdAndDelete({
      _id: id,
    });
    const eventsFromUser = await this.deleteRefFromEvent(
      resultDelete.event,
      resultDelete.user,
    );
    console.log(eventsFromUser);
  }

  async deleteRefFromEvent(id: string, user: string): Promise<any> {
    const eventsFromUser = await this.searchEvent(id, user);
    for (const event of eventsFromUser) {
      await this.calendarAdminEvent.findByIdAndUpdate(event._id, {
        $pull: { refs: { ref: user } },
      });
    }
    return eventsFromUser;
  }
  async searchEvent(id: string, user): Promise<any> {
    return await this.calendarAdminEvent.find({
      refs: { $elemMatch: { ref: { $gte: user } } },
      _id: id,
    });
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
    return this.calendarEvent.find({
      date: { $gte: startDate, $lte: endDate },
      user: dateEvent.user,
    });
  }

  async addObservations(id: string, data: ObservationI): Promise<any> {
    let eventResult = null;
    if (data.arriveTime) {
      eventResult = await this.calendarEvent.findByIdAndUpdate(id, {
        arriveTime: data.arriveTime,
        state: StatesEvent.inprogress,
      });

      await this.calendarAdminEvent.findByIdAndUpdate(eventResult.event, {
        arriveTime: data.arriveTime,
        state: StatesEvent.inprogress,
      });
    }
    if (data.leaveTime) {
      eventResult = await this.calendarEvent.findByIdAndUpdate(id, {
        leaveTime: data.leaveTime,
        state: StatesEvent.finished,
      });
      await this.calendarAdminEvent.findByIdAndUpdate(eventResult.event, {
        leaveTime: data.leaveTime,
        state: StatesEvent.finished,
      });
    }
    if (data.observations) {
      data.observations = data.observations.replace(/\n/g, '<br>');
      eventResult = await this.calendarEvent.findByIdAndUpdate(id, {
        observations: data.observations,
      });
      await this.calendarAdminEvent.findByIdAndUpdate(eventResult.event, {
        observations: data.observations,
      });
    }
    return eventResult;
  }

  async updateEvent(id: string, data: any): Promise<any> {
    return this.calendarEvent.findByIdAndUpdate(id, data);
  }

  async finishEvent(id: string): Promise<any> {
    await this.calendarAdminEvent.findByIdAndUpdate(id, { finished: true });
    await this.calendarEvent.findOneAndUpdate(
      { event: id },
      { finished: true },
    );
    return 'event finished';
  }

  async myEvents(data: MyEvents): Promise<any> {
    const user = data.user;
    const state = data.state;
    if (state.toLowerCase() === 'all') {
      const events = await this.calendarEvent.find({
        user,
      });
      for (let i = 0; i < events.length; i++) {
        const event_ = await this.calendarAdminEvent.findById(events[i].event);
        events[i]['name'] = event_.name;
      }
      return events;
    }

    const events = await this.calendarEvent.find({
      user,
      state: StatesEvent[state.toLowerCase()],
    });
    for (let i = 0; i < events.length; i++) {
      const event_ = await this.calendarAdminEvent.findById(events[i].event);
      events[i]['name'] = event_.name;
    }
    return events;
  }
}
