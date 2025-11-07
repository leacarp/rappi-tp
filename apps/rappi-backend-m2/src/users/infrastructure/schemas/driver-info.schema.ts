import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Location, LocationSchema } from './location.schema';
import { Earnings, EarningsSchema } from './earnings.schema';

export type DriverInfoDocument = DriverInfo & Document;

@Schema({ _id: false })
export class DriverInfo {
  @Prop({ required: true })
  vehicle: string;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: LocationSchema })
  currentLocation?: Location;

  @Prop({ type: EarningsSchema, default: () => ({ total: 0, details: [] }) })
  earnings: Earnings;
}

export const DriverInfoSchema = SchemaFactory.createForClass(DriverInfo);
