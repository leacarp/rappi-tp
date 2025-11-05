import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

export type PickUpLocationDocument = PickUp_Location & Document;

@Schema({id: false})
export class PickUp_Location{
    @Prop({required: true})
    latitude: number

    @Prop({required: true})
    longitude: number
}

export const PickUpLocationSchema = SchemaFactory.createForClass(PickUp_Location);