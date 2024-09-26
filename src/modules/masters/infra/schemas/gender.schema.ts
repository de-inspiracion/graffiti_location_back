import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type genderDocument = HydratedDocument<Gender>;

@Schema()
export class Gender extends Document {
  @Prop({ type: Object })
  name: {
    en: string;
    es: string;
  };
}

export const GenderSchema = SchemaFactory.createForClass(Gender);
