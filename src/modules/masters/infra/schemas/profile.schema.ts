import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ type: String })
  name: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
