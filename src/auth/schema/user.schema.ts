import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.__v;
            delete ret._id;
        }
    }
})
export class User {
    @Prop({ type: String })
    username: string;

    @Prop({ type: String })
    password: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);