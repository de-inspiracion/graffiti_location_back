import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
// import { Country } from './country.schema';
// en chile es Región.
@Schema()
export class City extends Document {
  @Prop({ type: String })
  name: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  country: string;

  @Prop({ type: [String] })
  cities: [string];
}

export const CitySchema = SchemaFactory.createForClass(City);
