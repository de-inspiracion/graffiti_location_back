import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { StatesEvent } from 'src/shared/enums/states';

@Schema()
export class CalendarRefEvent extends Document {
  @Prop({ type: String, default: 'PENDING' })
  state: StatesEvent;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CalendarEvent' })
  event: string;

  @Prop({ type: String })
  user: string;

  @Prop({ type: Date })
  date: string;

  @Prop({ type: String })
  arriveTime: string;

  @Prop({ type: String })
  leaveTime: string;

  @Prop({ type: String })
  observations: string;

  @Prop({ type: Boolean, default: false })
  finished: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CalendarRefEventSchema =
  SchemaFactory.createForClass(CalendarRefEvent);
