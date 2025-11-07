import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({id: false})
export class Payment{
    @Prop({
        required: true,
        enum:['card', 'cash', 'other'],
        default: 'cash'
    })
    method: string

    @Prop({required: true})
    status: string

    @Prop({required: true})
    transactionId: string
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);