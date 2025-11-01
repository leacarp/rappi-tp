import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { Address } from '../../domain/entities/address.entity';
import { User } from '../../domain/entities/user.entity';
import { Profile } from '../../domain/entities/profile.entity';
import { History } from '../../domain/entities/history.entity';
import { RatingReview } from '../../domain/entities/rating-review.entity';
import { VendorInfo } from '../../domain/entities/vendor-info.entity';
import { DriverInfo } from '../../domain/entities/driver-info.entity';
import { Location } from '../../domain/entities/location.entity';
import { Earnings } from '../../domain/entities/earnings.entity';
import { EarningsDetail } from '../../domain/entities/earnings-detail.entity';
import { EarningsBreakdown } from '../../domain/entities/earnings-breakdown.entity';
import { User as UserSchema, UserDocument } from '../schemas/user.schema';
import { Address as AddressSchema } from '../schemas/address.schema';
import { RatingReview as RatingReviewSchema } from '../schemas/rating-review.schema';
import { EarningsDetail as EarningsDetailSchema } from '../schemas/earnings-detail.schema';
import { DriverInfo as DriverInfoSchema } from '../schemas/driver-info.schema';
import { CartItem as CartItemSchema } from '../schemas/cart-item.schema';
import { CartItem } from '../../domain/entities/cart-item.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(UserSchema.name) private userModel: Model<UserDocument>) {}

  private readonly logger = new Logger(UserRepository.name);

  private buildIdFilter(id: string): { _id: Types.ObjectId | string } {
    const trimmed = (id || '').trim();
    if (Types.ObjectId.isValid(trimmed)) {
      return { _id: new Types.ObjectId(trimmed) };
    }
 
    return { _id: trimmed } ;
  }

  async getUserById(userId: string): Promise<User | null> {
    const filter = this.buildIdFilter(userId);
    const isObjId = filter._id instanceof Types.ObjectId;
    this.logger.debug(`getUserById id=${userId} len=${userId?.length} isObjId=${isObjId} collection=${this.userModel.collection.name}`);

    const userSchema = await this.userModel.findOne(filter).exec();
    this.logger.debug(`getUserById found=${!!userSchema}`);
    if (!userSchema) {
      return null;
    }

    return this.mapToUserEntity(userSchema);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const trimmedEmail = (email || '').trim().toLowerCase();

    const userSchema = await this.userModel.findOne({ email: trimmedEmail }).exec();
    if (!userSchema) {
      return null;
    }

    return this.mapToUserEntity(userSchema);
  }

  async updateUserReview(
    userId: string,
    reviewerId: string,
    score: number,
    comment: string | undefined,
    date: Date
  ): Promise<User | null> {
    const userFilter = this.buildIdFilter(userId);
    if (!Types.ObjectId.isValid(reviewerId)) {
      return null;
    }

    const updated = await this.userModel.findOneAndUpdate(
      { ...userFilter, 'ratingsAndReviews.reviewerId': new Types.ObjectId(reviewerId) },
      {
        $set: {
          'ratingsAndReviews.$.score': score,
          'ratingsAndReviews.$.comment': comment,
          'ratingsAndReviews.$.date': date,
        },
      },
      { new: true }
    ).exec();

    return updated ? this.mapToUserEntity(updated) : null;
  }

  async updateUserAddress(userId: string, addresses: Address[]): Promise<User | null> {
    if (!Types.ObjectId.isValid(userId)) {
      return null;
    }

    const addressSchemas: AddressSchema[] = addresses.map(address => ({
      _id: new Types.ObjectId(address.getId()),
      street: address.getStreet(),
      city: address.getCity(),
      zipCode: address.getZipCode(),
      isFavorite: address.getIsFavorite()
    }));

    const updatedUserSchema = await this.userModel.findByIdAndUpdate(
        userId,
        {
          $set: { 'profile.addresses': addressSchemas },
        },
        { new: true }
      ).exec();

    if (!updatedUserSchema) {
      return null;
    }

    return this.mapToUserEntity(updatedUserSchema);
  }  

  async updateVendorProfile(
    vendorId: string,
    restaurantName?: string,
    schedule?: string,
    phone?: string
  ): Promise<User | null> {
    if (!Types.ObjectId.isValid(vendorId)) {
      return null;
    }

    const updateFields: any = {}
    
    if (restaurantName !== undefined) {
      updateFields['profile.vendorInfo.restaurantName'] = restaurantName;
    }

    if (schedule !== undefined) {
      updateFields['profile.vendorInfo.schedule'] = schedule;
    }

    if (phone !== undefined) {
      updateFields['profile.phone'] = phone;
    }

    if (Object.keys(updateFields).length === 0) {
      return null;
    }

    const updateVendor = await this.userModel.findByIdAndUpdate(
      vendorId,
      { $set: updateFields },
      { new: true }
    ).exec();

    return updateVendor ? this.mapToUserEntity(updateVendor) : null;
  }

  async addUserReview(userId: string, review: RatingReview): Promise<User | null> {
    const userFilter = this.buildIdFilter(userId);
    const reviewDoc = {
      reviewerId: new Types.ObjectId(review.getReviewerId()),
      score: review.getScore(),
      comment: review.getComment(),
      date: review.getDate(),
    };

    const updatedUser = await this.userModel
      .findOneAndUpdate(
        userFilter,
        { $push: { ratingsAndReviews: reviewDoc } },
        { new: true }
      )
      .exec();

    return updatedUser ? this.mapToUserEntity(updatedUser) : null;
  }

  async getUserReviews(userId: string): Promise<RatingReview[]> {
    const userFilter = this.buildIdFilter(userId);
    const userDoc = await this.userModel.findOne(userFilter, { ratingsAndReviews: 1 }).exec();
    if (!userDoc || !userDoc.ratingsAndReviews) {
      return [];
    }

    return (userDoc.ratingsAndReviews as RatingReviewSchema[]).map((rating) =>
      new RatingReview(
        rating.reviewerId.toString(),
        rating.score,
        rating.date,
        rating.comment
      )
    );
  }

  async searchRestaurantsByNameOrCategory(param: string): Promise<VendorInfo[]> {
    const trimmedParam = (param || '').trim();
    if (!trimmedParam) {
      return [];
    }

    const usersWithRestaurantInfo = await this.userModel
      .find({
        role: 'vendor',
        $or: [
          { 'profile.vendorInfo.restaurantName': { $regex: trimmedParam, $options: 'i' } },
          { 'profile.vendorInfo.category': { $regex: trimmedParam, $options: 'i' } }
        ]
      })
      .select('profile.vendorInfo')
      .exec();
      
    return usersWithRestaurantInfo
      .filter(user => user.profile?.vendorInfo)
      .map(user => new VendorInfo(
        user.profile.vendorInfo.restaurantName,
        user.profile.vendorInfo.description,
        user.profile.vendorInfo.schedule,
        user.profile.vendorInfo.rating,
        user.profile.vendorInfo.isAvailable
      ));
  }

  async updateUserCart(userId: string, cartItems: CartItem[]): Promise<User | null> {
    if (!Types.ObjectId.isValid(userId)) {
      return null;
    }

    const cartDocs: CartItemSchema[] = cartItems.map(item => ({
      productId: new Types.ObjectId(item.getProductId()),
      name: item.getName(),
      price: item.getPrice(),
      quantity: item.getQuantity()
    }));

    const updatedUserSchema = await this.userModel.findByIdAndUpdate(
      userId,
      { $set: { cart: cartDocs } },
      { new: true }
    ).exec();

    return updatedUserSchema ? this.mapToUserEntity(updatedUserSchema) : null;
  }

  async updateDriverAvailability(userId: string, isAvailable: boolean): Promise<User | null> {
    if (!Types.ObjectId.isValid(userId)) {
      return null;
    }

    const updated = await this.userModel.findByIdAndUpdate(
      userId,
      { $set: { 'profile.driverInfo.isAvailable': isAvailable } },
      { new: true }
    ).exec();

    return updated ? this.mapToUserEntity(updated) : null;
  }

  async existsUser(userId: string): Promise<boolean> {
    const user = await this.userModel.exists({ _id: userId });
    return !!user;
  }

  private mapToUserEntity(userDoc: UserDocument): User {
    const addresses = (userDoc.profile?.addresses || []).map((addr: AddressSchema) => 
      new Address(
        addr._id.toString(),
        addr.street,
        addr.city,
        addr.zipCode,
        addr.isFavorite
      )
    );

    const vendorInfo = userDoc.profile?.vendorInfo ? 
      new VendorInfo(
        userDoc.profile.vendorInfo.restaurantName,
        userDoc.profile.vendorInfo.description,
        userDoc.profile.vendorInfo.schedule,
        userDoc.profile.vendorInfo.rating,
        userDoc.profile.vendorInfo.isAvailable
      ) : undefined;

    const driverInfo = userDoc.profile?.driverInfo ? 
      this.mapToDriverInfoEntity(userDoc.profile.driverInfo) : undefined;

    const profile = new Profile(
      userDoc.profile.name,
      addresses,
      vendorInfo,
      driverInfo,
      userDoc.profile.phone
    );

    const history = new History(
      (userDoc.history?.orders || []).map((id: Types.ObjectId) => id.toString()),
      (userDoc.history?.deliveries || []).map((id: Types.ObjectId) => id.toString())
    );

    const ratingsAndReviews = (userDoc.ratingsAndReviews || []).map((rating: RatingReviewSchema) =>
      new RatingReview(
        rating.reviewerId.toString(),
        rating.score,
        rating.date,
        rating.comment
      )
    );

    const favorites = (userDoc.favorites || []).map((id: Types.ObjectId) => id.toString());


    const cart = (userDoc.cart || []).map((ci: CartItemSchema) =>
      new CartItem(
        ci.productId.toString(),
        ci.name,
        ci.price,
        ci.quantity
      )
    );

    return new User(
      userDoc._id.toString(),
      userDoc.email,
      userDoc.password,
      userDoc.role,
      profile,
      favorites,
      history,
      ratingsAndReviews,
      userDoc.createdAt || new Date(),
      userDoc.updatedAt || new Date(),
      cart
    );
  }

  private mapToDriverInfoEntity(driverDoc: DriverInfoSchema): DriverInfo {
    const currentLocation = driverDoc.currentLocation ? 
      new Location(driverDoc.currentLocation.latitude, driverDoc.currentLocation.longitude) : undefined;

    const earningsDetails = (driverDoc.earnings?.details || []).map((detail: EarningsDetailSchema) => {
      const breakdown = new EarningsBreakdown(
        detail.breakdown.baseFee,
        detail.breakdown.tips,
        detail.breakdown.bonuses
      );
      return new EarningsDetail(
        detail.deliveryId.toString(),
        detail.amount,
        breakdown
      );
    });

    const earnings = new Earnings(
      driverDoc.earnings?.total || 0,
      earningsDetails
    );

    return new DriverInfo(
      driverDoc.vehicle,
      driverDoc.isAvailable,
      earnings,
      currentLocation
    );
  }
}
