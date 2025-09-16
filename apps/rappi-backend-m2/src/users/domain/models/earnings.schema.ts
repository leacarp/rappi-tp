import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EarningsDetail, EarningsDetailSchema } from './earnings-detail.schema';

export type EarningsDocument = Earnings & Document;

@Schema({ _id: false })
export class Earnings {
  @Prop({ required: true, default: 0 })
  total: number;

  @Prop({ type: [EarningsDetailSchema], default: [] })
  details: EarningsDetail[];
}

export const EarningsSchema = SchemaFactory.createForClass(Earnings);
