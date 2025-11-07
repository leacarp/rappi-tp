import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: Types.ObjectId, required: true })
  vendorId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageURL: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({
    type: {
      isOnPromotion: { type: Boolean, default: false },
      discountedPrice: { type: Number, default: 0 }
    },
    default: { isOnPromotion: false, discountedPrice: 0 }
  })
  promotions: {
    isOnPromotion: boolean;
    discountedPrice: number;
  };
}

export const ProductSchema = SchemaFactory.createForClass(Product);