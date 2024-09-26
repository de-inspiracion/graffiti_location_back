import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

export enum TypeLogger {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

@Schema()
export class Log {
    @Prop({ type: String, enum: TypeLogger, default: TypeLogger.INFO })
    type: TypeLogger;

    @Prop({ type: String, default: '0' })
    message: number;

    @Prop({ type: String })
    module: string;

    @Prop({ type: String })
    service: string;

    @Prop({ type: String })
    query: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);