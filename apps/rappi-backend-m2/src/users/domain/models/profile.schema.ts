import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address, AddressSchema } from './address.schema';
import { VendorInfo, VendorInfoSchema } from './vendor-info.schema';
import { DriverInfo, DriverInfoSchema } from './driver-info.schema';

export type ProfileDocument = Profile & Document;

@Schema({ _id: false })
export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop()
  phone?: string;

  @Prop({ type: [AddressSchema], default: [] })
  addresses: Address[];

  @Prop({ type: VendorInfoSchema })
  vendorInfo?: VendorInfo;

  @Prop({ type: DriverInfoSchema })
  driverInfo?: DriverInfo;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
