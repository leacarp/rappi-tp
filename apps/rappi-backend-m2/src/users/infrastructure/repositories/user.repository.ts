import { Injectable } from '@nestjs/common';
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

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(UserSchema.name) private userModel: Model<UserDocument>) {}

  async getUserById(userId: string): Promise<User | null> {
    if (!Types.ObjectId.isValid(userId)) {
      return null;
    }

    const userSchema = await this.userModel.findById(userId).exec();
    if (!userSchema) {
      return null;
    }

    return this.mapToUserEntity(userSchema);
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

  private mapToUserEntity(userDoc: any): User {
    const addresses = (userDoc.profile?.addresses || []).map((addr: any) => 
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
      (userDoc.history?.orders || []).map((id: any) => id.toString()),
      (userDoc.history?.deliveries || []).map((id: any) => id.toString())
    );

    const ratingsAndReviews = (userDoc.ratingsAndReviews || []).map((rating: any) =>
      new RatingReview(
        rating.reviewerId.toString(),
        rating.score,
        rating.date,
        rating.comment
      )
    );

    const favorites = (userDoc.favorites || []).map((id: any) => id.toString());

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
      userDoc.updatedAt || new Date()
    );
  }

  private mapToDriverInfoEntity(driverDoc: any): DriverInfo {
    const currentLocation = driverDoc.currentLocation ? 
      new Location(driverDoc.currentLocation.latitude, driverDoc.currentLocation.longitude) : undefined;

    const earningsDetails = (driverDoc.earnings?.details || []).map((detail: any) => {
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
