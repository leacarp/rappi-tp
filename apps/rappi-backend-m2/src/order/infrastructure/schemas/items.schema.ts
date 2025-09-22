import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'


export type ItemsDocument = Items & Document;

@Schema({_id: false})
export class Items{

    @Prop({ required: true, type: Types.ObjectId, ref: 'Order'})
    productId: Types.ObjectId;

    @Prop({required: true})
    name: string

    @Prop({required: true})
    quantity: number

    @Prop({required: true})
    price: number
}

export const ItemsSchema = SchemaFactory.createForClass(Items);