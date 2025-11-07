import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

export type DeliveryLocation = Delivery_Location & Document;

@Schema({id: false})
export class Delivery_Location{
    @Prop({required: true})
    latitude: number

    @Prop({required: true})
    longitude: number
}

export const DeliveryLocationSchema = SchemaFactory.createForClass(Delivery_Location);