import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type registerRefDocument = HydratedDocument<RegisterRef>;

@Schema()
export class RegisterRef extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  photoSelfie: string;

  @Prop({ type: String })
  photoDocumentFront: string;

  @Prop({ type: String })
  photoDocumentBack: string;

  @Prop({ type: Number })
  yearsExperience: number;

  @Prop({ type: [Object] })
  sportsImplementation: object[];

  @Prop({ type: String, unique: true })
  dni: string;

  @Prop({ type: String })
  country: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  stateAddress: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String, default: 'REF' })
  profile: string;

  @Prop({ type: String, default: 'PENDING' })
  stateRegistry: string;

  @Prop({ type: Boolean, default: false })
  emailVerified: boolean;

  @Prop({ type: Date })
  birthdate: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  postalCode: string;

  @Prop({ type: String })
  emailVerifytoken: string;

  @Prop({ type: Object })
  topics: object;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const RegisterRefSchema = SchemaFactory.createForClass(RegisterRef);
