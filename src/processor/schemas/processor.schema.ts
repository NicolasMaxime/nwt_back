import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class Processor extends Document {
  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  designer:string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })

  family:string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  modelName:string;

  @Prop({
    type: Number,
    required: true,
  })
  clock:number;

  @Prop({
    type: Number,
    required: true,
  })
  max_clock:number;

  @Prop({
    type: Number,
    required: true,
  })
  cache:number;

  @Prop({
    type: Number,
    required: true,
  })
  cores:number;

  @Prop({
    type: Number,
    required: true,
  })
  threads:number;
}

export const ProcessorSchema = SchemaFactory.createForClass(Processor);
