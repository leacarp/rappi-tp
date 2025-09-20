import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({ _id: true })
export class Address {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true, default: false })
  isFavorite: boolean;

  constructor(
    _id: Types.ObjectId,
    street: string,
    city: string,
    zipCode: string,
    isFavorite: boolean
  ) {
    this._id = _id;
    this.street = street;
    this.city = city;
    this.zipCode = zipCode;
    this.isFavorite = isFavorite;
  }
}

export const AddressSchema = SchemaFactory.createForClass(Address);
