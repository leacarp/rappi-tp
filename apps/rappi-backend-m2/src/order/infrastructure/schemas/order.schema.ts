import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PickUp_Location, PickUpLocationSchema } from './pickup-location.schema';
import {Delivery_Location, DeliveryLocationSchema} from './delivery-location.schema'
import {Summary, SummarySchema} from './summary.schema'
import {Payment, PaymentSchema} from './payment.schema'
import {Items, ItemsSchema} from './items.schema'


export type OrderDocument = Order & Document;


@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Order{
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    customerId: Types.ObjectId; 

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    vendorId: Types.ObjectId; 

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    driverId: Types.ObjectId; 

    @Prop({
        required: true,
        enum: ['pending', 'accepted', 'preparing', 'ready for pickup', 'in transit', 'delivered', 'canceled'],
        default: 'pending' 
    })
    status: string;

    @Prop({ type: PickUpLocationSchema })
    pickUpLocation?: PickUp_Location;
    
    @Prop({type: DeliveryLocationSchema})
    deliveryLocation?: Delivery_Location;

    @Prop({type: [ItemsSchema], required: true})
    items: Items[];

    @Prop({type: SummarySchema, required: true})
    summary: Summary;

    @Prop({type: PaymentSchema, required: true})
    payment: Payment;

    @Prop({required: true})
    trackingNumber: string;

    @Prop({required: true})
    notes: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);