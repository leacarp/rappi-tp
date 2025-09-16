import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { CreateAddressRequestService } from './dtos/create-address-request-service';
import { Types } from 'mongoose';
import { Address } from '../domain/models/address.schema';
import { AddressItemService, GetAddressesResponseService } from './dtos/get-addresses-response-service';
import { GetAddressResponseService } from './dtos/get-address-response-service';
import { UpdateAddressRequestService } from './dtos/update-address-request-service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAddresses(userId: string): Promise<GetAddressesResponseService> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const addresses = (user.profile.addresses || []).map(address => 
      new AddressItemService(
        address._id.toString(),
        address.street,
        address.city,
        address.zipCode,
        address.isFavorite
      )
    );

    const addressesResponse = new GetAddressesResponseService(addresses);

    return addressesResponse;
  }

  async getAddress(userId: string, addressId: string): Promise<GetAddressResponseService> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const address = user.profile.addresses.find(address => address._id.toString() === addressId);
    if (!address) {
      throw new NotFoundException('Dirección no encontrada');
    }

    const addressResponse = new GetAddressResponseService(
      address._id.toString(),
      address.street,
      address.city,
      address.zipCode,
      address.isFavorite
    );

    return addressResponse;
  }

  async addAddress(userId: string, newAddress: CreateAddressRequestService): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const addressDomainDto = new Address(
      new Types.ObjectId(),
      newAddress.getStreet(),
      newAddress.getCity(),
      newAddress.getZipCode(),
      newAddress.getIsFavorite()
    );

    if (addressDomainDto.isFavorite)
    {
      user.profile.addresses.forEach(addr => {
        if (addr.isFavorite) {
          addr.isFavorite = false;
        }
      });
    }

    user.profile.addresses.push(addressDomainDto);

    const updatedUser = await this.userRepository.updateUserAddress(userId, user.profile.addresses);

    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async updateAddress(userId: string, editedAddress: UpdateAddressRequestService): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const address = user.profile.addresses.find(address => address._id.toString() === editedAddress.getId());
    if (!address) {
      throw new NotFoundException('Dirección no encontrada');
    }

    if (editedAddress.getIsFavorite())
    {
      user.profile.addresses.forEach(addr => {
        if (addr.isFavorite) {
          addr.isFavorite = false;
        }
      });
    }

    address.street = editedAddress.getStreet();
    address.city = editedAddress.getCity();
    address.zipCode = editedAddress.getZipCode();
    address.isFavorite = editedAddress.getIsFavorite();

    const updatedUser = await this.userRepository.updateUserAddress(userId, user.profile.addresses);

    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async deleteAddress(userId: string, addressId: string): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const address = user.profile.addresses.find(address => address._id.toString() === addressId);
    if (!address) {
      throw new NotFoundException('Dirección no encontrada');
    }
    
    user.profile.addresses = user.profile.addresses.filter(address => address._id.toString() !== addressId);

    const updatedUser = await this.userRepository.updateUserAddress(userId, user.profile.addresses);

    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}
