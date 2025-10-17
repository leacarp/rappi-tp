import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VendorInfoDocument = VendorInfo & Document;

@Schema({ _id: false })
export class VendorInfo {
  @Prop({ required: true })
  restaurantName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  schedule: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ required: true })
  category: string;
}

export const VendorInfoSchema = SchemaFactory.createForClass(VendorInfo);
