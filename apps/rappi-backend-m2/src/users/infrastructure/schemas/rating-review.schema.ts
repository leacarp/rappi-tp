import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RatingReviewDocument = RatingReview & Document;

@Schema({ _id: false })
export class RatingReview {
  @Prop({ required: true, type: Types.ObjectId })
  reviewerId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  score: number;

  @Prop()
  comment?: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const RatingReviewSchema = SchemaFactory.createForClass(RatingReview);