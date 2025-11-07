import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Profile, ProfileSchema } from './profile.schema';
import { RatingReview, RatingReviewSchema } from './rating-review.schema';
import { History, HistorySchema } from './history.schema';
import { CartItem, CartItemSchema } from './cart-item.schema'; 

export type UserDocument = User & Document & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ 
    required: true, 
    enum: ['customer', 'vendor', 'driver', 'admin'],
    default: 'customer'
  })
  role: string;

  @Prop({ type: ProfileSchema, required: true })
  profile: Profile;

  @Prop({ type: [Types.ObjectId], default: [] })
  favorites: Types.ObjectId[];

  @Prop({ type: HistorySchema, default: () => ({ orders: [], deliveries: [] }) })
  history: History;

  @Prop({ type: [RatingReviewSchema], default: [] })
  ratingsAndReviews: RatingReview[];

  @Prop({ type: [CartItemSchema], default: [] })
  cart: CartItem[];
}

export const UserSchema = SchemaFactory.createForClass(User);