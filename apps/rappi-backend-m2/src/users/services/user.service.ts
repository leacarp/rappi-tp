import { Types } from 'mongoose';
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { USER_REPOSITORY_TOKEN } from '../domain/tokens/user-repository.token';
import { CreateAddressRequestService } from './dtos/create-address-request-service';
import { GetAddressesResponseService } from './dtos/get-addresses-response-service';
import { GetAddressResponseService } from './dtos/get-address-response-service';
import { UpdateAddressRequestService } from './dtos/update-address-request-service';

@Injectable()
export class UserService {
  constructor(@Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: IUserRepository) {}

  async getAddresses(userId: string): Promise<GetAddressesResponseService> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const addresses = user.getProfile().getAddresses() || [];
    
    return GetAddressesResponseService.fromEntities(addresses);
  }

  async getAddress(userId: string, addressId: string): Promise<GetAddressResponseService> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const address = user.getProfile().getAddresses().find(address => address.getId() === addressId);
    if (!address) {
      throw new NotFoundException('Dirección no encontrada');
    }

    return GetAddressResponseService.fromEntity(address);
  }

  async addAddress(userId: string, newAddress: CreateAddressRequestService): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const addressEntity = newAddress.toEntity(new Types.ObjectId().toString());

    user.getProfile().addAddress(addressEntity);

    const updatedUser = await this.userRepository.updateUserAddress(
      userId, 
      user.getProfile().getAddresses()
    );

    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async updateAddress(userId: string, editedAddress: UpdateAddressRequestService): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    user.getProfile().updateAddress(editedAddress.getId(), editedAddress.toEntity());

    const updatedUser = await this.userRepository.updateUserAddress(
      userId,
      user.getProfile().getAddresses()
    );

    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async deleteAddress(userId: string, addressId: string): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    user.getProfile().removeAddress(addressId);

    const updatedUser = await this.userRepository.updateUserAddress(
      userId,
      user.getProfile().getAddresses()
    );

    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}
