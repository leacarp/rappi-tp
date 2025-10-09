import { Address } from '../entities/address.entity';
import { User } from '../entities/user.entity';
import { RatingReview } from '../entities/rating-review.entity';
import { VendorInfo } from '../entities/vendor-info.entity';

export interface IUserRepository {
  getUserById(userId: string): Promise<User | null>;

  getUserByEmail(email: string): Promise<User | null>;

  updateUserAddress(userId: string, addresses: Address[]): Promise<User | null>;

  addUserReview(userId: string, review: RatingReview): Promise<User | null>;

  getUserReviews(userId: string): Promise<RatingReview[]>;

  updateUserReview(
    userId: string,
    reviewerId: string,
    score: number,
    comment: string | undefined,
    date: Date
  ): Promise<User | null>;

  searchRestaurantsByName(restaurantName: string): Promise<VendorInfo[]>;
}
