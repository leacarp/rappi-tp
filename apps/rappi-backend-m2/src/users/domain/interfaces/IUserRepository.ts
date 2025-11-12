import { Address } from '../entities/address.entity';
import { User } from '../entities/user.entity';
import { RatingReview } from '../entities/rating-review.entity';
import { VendorInfo } from '../entities/vendor-info.entity';
import { CartItem } from '../entities/cart-item.entity';
import { CreateUserData } from '../types/create-user-data.type';

export interface IUserRepository {
  getUserById(userId: string): Promise<User | null>;

  getUserByEmail(email: string): Promise<User | null>;

  updateUserAddress(userId: string, addresses: Address[]): Promise<User | null>;

  addUserReview(userId: string, review: RatingReview): Promise<User | null>;

  getUserReviews(userId: string): Promise<RatingReview[]>;

  updateVendorProfile(
    vendorId: string,
    restaurantName?: string,
    schedule?: string,
    phone?:string
  ): Promise<User | null>;

  updateUserReview(
    userId: string,
    reviewerId: string,
    score: number,
    comment: string | undefined,
    date: Date
  ): Promise<User | null>;

  searchRestaurantsByNameOrCategory(param: string): Promise<{ vendorInfo: VendorInfo, userId: string }[]>;

  updateUserCart(userId: string, cartItems: CartItem[]): Promise<User | null>;

  updateDriverAvailability(userId: string, isAvailable: boolean): Promise<User | null>;

  existsUser(userId: string): Promise<boolean>;

  createUser(userData: CreateUserData): Promise<User>;

  getUsersByRole(role: string): Promise<User[]>;
}