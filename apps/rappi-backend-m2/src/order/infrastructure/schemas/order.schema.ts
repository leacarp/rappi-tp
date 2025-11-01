import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PickUp_Location, PickUpLocationSchema } from './pickup-location.schema';
import {Delivery_Location, DeliveryLocationSchema} from './delivery-location.schema'
import {Summary, SummarySchema} from './summary.schema'
import {Payment, PaymentSchema} from './payment.schema'
import {Items, ItemsSchema} from './items.schema'
import { OrderStatus } from '../../domain/enum/order-status';


export type OrderDocument = Order & Document;


@Schema({ timestamps: true})
export class Order{
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    customerId: Types.ObjectId; 

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    vendorId: Types.ObjectId; 

    @Prop({ type: Types.ObjectId, ref: 'User', required: false })
    driverId?: Types.ObjectId; 
    
    @Prop({ type: String, enum: Object.values(OrderStatus), required: true })
    status: OrderStatus;


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

    createdAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);