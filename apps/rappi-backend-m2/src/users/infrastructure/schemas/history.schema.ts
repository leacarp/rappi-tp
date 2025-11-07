import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema({ _id: false })
export class History {
  @Prop({ type: [Types.ObjectId], default: [] })
  orders: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], default: [] })
  deliveries: Types.ObjectId[];
}

export const HistorySchema = SchemaFactory.createForClass(History);