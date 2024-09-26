import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Country extends Document {
  @Prop({ type: String })
  name: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
