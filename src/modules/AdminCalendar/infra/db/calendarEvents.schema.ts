import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { StatesEvent } from 'src/shared/enums/states';

@Schema()
export class CalendarAdminEvent extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Date })
  date: string;

  @Prop({ type: String })
  country: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: Boolean, default: true })
  available: boolean;

  @Prop({ type: [Object], default: [] })
  refs: [any];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Stadium' })
  stadium: string;

  @Prop({ type: String })
  field: string;

  @Prop({ type: String })
  arriveTime: string;

  @Prop({ type: String })
  leaveTime: string;

  @Prop({ type: String })
  observations: string;

  @Prop({ type: Boolean, default: false })
  finished: boolean;

  @Prop({ type: String, default: 'PENDING' })
  state: StatesEvent;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CalendarAdminEventSchema =
  SchemaFactory.createForClass(CalendarAdminEvent);
