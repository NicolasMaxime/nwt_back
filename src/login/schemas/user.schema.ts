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

    @Prop({
        type: String,
        required: false,
        minlength: 2,
        trim: true,
    })
    email: string;

    @Prop({
        type: String,
        required: false,
        minlength: 2,
        trim: true,
    })
    firstname: string;

    @Prop({
        type: String,
        required: false,
        minlength: 2,
        trim: true,
    })
    lastname: string;

    @Prop({
        type: String,
        required: false,
        minlength: 2,
        trim: true,
    })
    config: any;
}

export const UserSchema = SchemaFactory.createForClass(User)
