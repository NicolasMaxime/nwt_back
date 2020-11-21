import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class User extends Document {

    @Prop({
        type: String,
        required: true,
        minlength: 2,
        trim: true,
        unique: true,
    })
    login: string;

    @Prop({
        type: String,
        required: true,
        minlength: 10,
        trim: true,
    })
    salt: string;

    @Prop({
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
