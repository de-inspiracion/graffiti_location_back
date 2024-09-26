import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class typeDocument extends Document {
  @Prop({ type: Object })
  name: {
    en: string;
    es: string;
  };
}

export const TypeDocumentSchema = SchemaFactory.createForClass(typeDocument);
