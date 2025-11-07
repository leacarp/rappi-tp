import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { EarningsBreakdown, EarningsBreakdownSchema } from './earnings-breakdown.schema';

export type EarningsDetailDocument = EarningsDetail & Document;

@Schema({ _id: false })
export class EarningsDetail {
  @Prop({ required: true, type: Types.ObjectId })
  deliveryId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: EarningsBreakdownSchema, required: true })
  breakdown: EarningsBreakdown;
}

export const EarningsDetailSchema = SchemaFactory.createForClass(EarningsDetail);