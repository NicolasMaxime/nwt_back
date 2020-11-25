import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import {ConfigurationSchema} from "../../configuration/schemas/configuration.schema";

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
        type: Boolean,
        required: false,
    })
    admin: boolean;

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
        trim: true,
    })
    firstname: string;

    @Prop({
        type: String,
        required: false,
        trim: true,
    })
    lastname: string;

    @Prop({
        type: String,
        required: false,
        trim: true,
    })
    email: string;

    @Prop([{
        type: ConfigurationSchema,
        required: false,
        trim: true,
    }])
    favorites: any;
}

export const UserSchema = SchemaFactory.createForClass(User)
