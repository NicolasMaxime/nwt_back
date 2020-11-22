import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Schema as MongooseSchema} from 'mongoose';
import { Processor } from '../../processor/schemas/processor.schema';

@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class Configuration extends Document {
  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  name:string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  processor: string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  cooler:string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  motherboard:string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  ram:string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  graphic_card:string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  ssd:string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  hard_drive:string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  case:string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  power_supply_unit:string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  sound_card:string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  network_adapter:string;
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
