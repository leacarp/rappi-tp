import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EarningsBreakdownDocument = EarningsBreakdown & Document;

@Schema({ _id: false })
export class EarningsBreakdown {
  @Prop({ required: true, default: 0 })
  baseFee: number;

  @Prop({ required: true, default: 0 })
  tips: number;

  @Prop({ required: true, default: 0 })
  bonuses: number;
}

export const EarningsBreakdownSchema = SchemaFactory.createForClass(EarningsBreakdown);
