import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../models/user.schema';
import { Address } from '../models/address.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(userId: string): Promise<UserDocument | null> {
    if (!Types.ObjectId.isValid(userId)) {
      return null;
    }

    return await this.userModel.findById(userId).exec();
  }

  async updateUserAddress(userId: string, addresses: Address[]): Promise<UserDocument | null> {
    if (!Types.ObjectId.isValid(userId)) {
      return null;
    }
    
    return this.userModel.findByIdAndUpdate(
        userId,
        {
          $set: { 'profile.addresses': addresses },
        },
        { new: true }
      ).exec();
  }
}
