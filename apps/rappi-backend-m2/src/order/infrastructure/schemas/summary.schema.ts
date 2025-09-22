import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

export type SummaryDocument = Summary & Document;

@Schema({id: false})
export class Summary{

    @Prop({required: true})
    subtotal: number

    @Prop({required: true})
    shippingCost: number

    @Prop({required: true})
    taxes: number

    @Prop({required: true})
    discount: number

    @Prop({required: true})
    total: number

}

export const SummarySchema = SchemaFactory.createForClass(Summary);