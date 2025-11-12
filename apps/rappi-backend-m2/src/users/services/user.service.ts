import { Types } from 'mongoose'; 
import * as bcrypt from 'bcrypt';
import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';

import { PRODUCT_ADAPTER } from '../../products/infrastructure/constants/product-adapter.constants';
import { IProductAdapter } from '../../products/domain/interfaces/IProductAdapter';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { IUserService } from '../domain/interfaces/IUserService';
import { USER_REPOSITORY_TOKEN } from '../domain/tokens/user-repository.token';
import { CartItem } from '../domain/entities/cart-item.entity';
import { CreateAddressRequestService } from './dtos/create-address-request-service';
import { GetAddressesResponseService } from './dtos/get-addresses-response-service';
import { GetAddressResponseService } from './dtos/get-address-response-service';
import { UpdateAddressRequestService } from './dtos/update-address-request-service';
import { CreateReviewRequestService } from './dtos/create-review-request-service';
import { GetReviewsResponseService } from './dtos/get-reviews-response-service';
import { SearchRestaurantsResponseService } from './dtos/search-restaurants-response-service';
import { GetVendorProfile } from './dtos/get-vendor-profile-service';
import { UpdateVendorProfile } from './dtos/update-vendor-profile-service';
import { AddCartItemRequestService } from './dtos/add-cart-item-request-service';
import { SetCartItemQuantityRequestService } from './dtos/set-cart-item-quantity-request-service';
import { GetCartResponseService } from './dtos/get-cart-response-service';
import { CreateUserResponseService } from './dtos/create-user-response-service.dto';
import { VendorListItemService } from './dtos/vendor-list-item-service.dto';
import { DriverListItemService } from './dtos/driver-list-item-service.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PRODUCT_ADAPTER)
    private readonly productAdapter: IProductAdapter
  ) {}

  async getVendorProfile(vendorId: string): Promise<GetVendorProfile> {
    const vendor = await this.userRepository.getUserById(vendorId);
    if (!vendor) {
      throw new NotFoundException('Vendor no encontrado');
    }
    return GetVendorProfile.fromEntity(vendor);
  }

  async updateVendorProfile(vendorId: string, editedVendorProfile: UpdateVendorProfile): Promise<void> {
    const vendor = await this.userRepository.getUserById(vendorId);
    if (!vendor) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (vendor.getRole() !== 'vendor') {
      throw new NotFoundException('Usuario no es un vendor');
    }

    const vendorInfo = vendor.getProfile().getVendorInfo();
    if (!vendorInfo){
      throw new NotFoundException('El vendor no tiene información del perfil');
    }

    if (editedVendorProfile.getRestaurantName() !== undefined) {
      vendorInfo.setRestaurantName(editedVendorProfile.getRestaurantName());
    }

    if (editedVendorProfile.getSchedule() !== undefined) {
      vendorInfo.setSchedule(editedVendorProfile.getSchedule());
    }

    if (editedVendorProfile.getPhone() !== undefined) {
      vendor.getProfile().setPhone(editedVendorProfile.getPhone());
    }

    const updateVendor = await this.userRepository.updateVendorProfile(
      vendorId,
      editedVendorProfile.getRestaurantName(),
      editedVendorProfile.getSchedule(),
      editedVendorProfile.getPhone()
    )

    if (!updateVendor) {
      throw new NotFoundException('Error al actualizar el perfil del vendor');
    }
  }

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

  async addReview(userId: string, request: CreateReviewRequestService): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const entity = request.toEntity(new Date());
    const updated = await this.userRepository.addUserReview(userId, entity);
    if (!updated) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async getReviews(userId: string): Promise<GetReviewsResponseService> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const reviews = await this.userRepository.getUserReviews(userId);
    return GetReviewsResponseService.fromEntities(reviews);
  }

  async addVendorReview(vendorId: string, request: CreateReviewRequestService): Promise<void> {
    vendorId = (vendorId || '').trim();

    const vendor = await this.userRepository.getUserById(vendorId);
    if (!vendor || vendor.getRole() !== 'vendor') {
      throw new NotFoundException('Vendor no encontrado');
    }

    const entity = request.toEntity(new Date());
    const existing = await this.userRepository.getUserReviews(vendorId);
    
    const already = existing.find(r => r.getReviewerId() === entity.getReviewerId());
    if (already) {
      const updated = await this.userRepository.updateUserReview(
        vendorId,
        entity.getReviewerId(),
        entity.getScore(),
        entity.getComment(),
        entity.getDate()
      );
      
      if (!updated) {
        throw new NotFoundException('Vendor no encontrado');
      }
    } else {
      const updated = await this.userRepository.addUserReview(vendorId, entity);
      if (!updated) {
        throw new NotFoundException('Vendor no encontrado');
      }
    }
  }

  async getVendorReviews(vendorId: string): Promise<GetReviewsResponseService> {
    vendorId = (vendorId || '').trim();
    
    const vendor = await this.userRepository.getUserById(vendorId);
    if (!vendor) {
      throw new NotFoundException('Vendor no encontrado');
    }
    
    const reviews = await this.userRepository.getUserReviews(vendorId);
    return GetReviewsResponseService.fromEntities(reviews);
  }

  async searchRestaurantsByNameOrCategory(param: string): Promise<SearchRestaurantsResponseService> {
    const trimmedParam = (param || '').trim();
    if (!trimmedParam) {
      return SearchRestaurantsResponseService.fromVendorInfoEntities([]);
    }

    const vendorInfos = await this.userRepository.searchRestaurantsByNameOrCategory(trimmedParam);
    
    return SearchRestaurantsResponseService.fromVendorInfoEntities(vendorInfos);
  }
  
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }
  
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async addCartItem(userId: string, req: AddCartItemRequestService): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const product = await this.productAdapter.getProductById(req.getProductId());
    if (!product) throw new NotFoundException('Producto no encontrado');

    user.addOrIncrementCartItem(
        new CartItem(
            product.getId().toString(),
            product.getName(),
            product.getPrice(),
            1
        )
    );
    const updated = await this.userRepository.updateUserCart(userId, user.getCart());
    if (!updated) throw new NotFoundException('Usuario no encontrado');
  }

  async setCartItemQuantity(userId: string, req: SetCartItemQuantityRequestService): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    user.setCartItemQuantity(req.getProductId(), req.getQuantity());

    const updated = await this.userRepository.updateUserCart(userId, user.getCart());
    if (!updated) throw new NotFoundException('Usuario no encontrado');
  }

  async getCart(userId: string): Promise<GetCartResponseService> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    return GetCartResponseService.fromEntities(user.getCart());
  }

  async getDriverAvailability(userId: string): Promise<boolean> {
    const user = await this.userRepository.getUserById(userId);

    if (!user)
      throw new NotFoundException('Usuario no encontrado');

    if (user.getRole() !== 'driver')
      throw new NotFoundException('Usuario no es un driver');
    
    return user.getProfile().getDriverInfo().getIsAvailable();
  }

  async updateDriverAvailability(userId: string, isAvailable: boolean): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (user.getRole() !== 'driver') throw new NotFoundException('Usuario no es un driver');
    
    user.getProfile().getDriverInfo().setIsAvailable(isAvailable);
    
    const updated = await this.userRepository.updateDriverAvailability(userId, isAvailable);
    if (!updated) throw new NotFoundException('Error al actualizar la disponibilidad del driver');
  }

  async createVendor(
    email: string, 
    password: string, 
    name: string, 
    phone: string, 
    restaurantName: string, 
    description: string, 
    schedule: string,
    category: string
  ): Promise<CreateUserResponseService> {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }

    const hashedPassword = await this.hashPassword(password);

    const userData = {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'vendor',
      profile: {
        name,
        phone,
        addresses: [],
        vendorInfo: {
          restaurantName,
          description,
          schedule,
          rating: 0,
          isAvailable: true,
          category
        }
      },
      favorites: [],
      history: { orders: [], deliveries: [] },
      ratingsAndReviews: [],
      cart: []
    };

    const createdUser = await this.userRepository.createUser(userData);
    
    return new CreateUserResponseService(
      createdUser.getId(),
      createdUser.getEmail(),
      createdUser.getRole(),
      createdUser.getProfile().getName(),
      createdUser.getProfile().getVendorInfo()?.getRestaurantName()
    );
  }

  async createDriver(
    email: string, 
    password: string, 
    name: string, 
    phone: string, 
    vehicle: string
  ): Promise<CreateUserResponseService> {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }

    const hashedPassword = await this.hashPassword(password);

    const userData = {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'driver',
      profile: {
        name,
        phone,
        addresses: [],
        driverInfo: {
          vehicle,
          isAvailable: true,
          earnings: {
            total: 0,
            details: []
          }
        }
      },
      favorites: [],
      history: { orders: [], deliveries: [] },
      ratingsAndReviews: [],
      cart: []
    };

    const createdUser = await this.userRepository.createUser(userData);
    
    return new CreateUserResponseService(
      createdUser.getId(),
      createdUser.getEmail(),
      createdUser.getRole(),
      createdUser.getProfile().getName(),
      createdUser.getProfile().getDriverInfo()?.getVehicle()
    );
  }

  async createAdmin(
    email: string, 
    password: string, 
    name: string, 
    phone: string
  ): Promise<CreateUserResponseService> {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const hashedPassword = await this.hashPassword(password);

    const userData = {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'admin',
      profile: {
        name,
        phone,
        addresses: []
      },
      favorites: [],
      history: { orders: [], deliveries: [] },
      ratingsAndReviews: [],
      cart: []
    };

    const createdUser = await this.userRepository.createUser(userData);
    
    return new CreateUserResponseService(
      createdUser.getId(),
      createdUser.getEmail(),
      createdUser.getRole(),
      createdUser.getProfile().getName(),
      createdUser.getProfile().getPhone()
    );
  }

  async getAllVendors(): Promise<VendorListItemService[]> {
    const vendors = await this.userRepository.getUsersByRole('vendor');
    
    return vendors.map(vendor => new VendorListItemService(
      vendor.getId(),
      vendor.getEmail(),
      vendor.getProfile().getName(),
      vendor.getProfile().getPhone(),
      vendor.getCreatedAt(),
      vendor.getProfile().getVendorInfo()?.getRestaurantName(),
      vendor.getProfile().getVendorInfo()?.getDescription(),
      vendor.getProfile().getVendorInfo()?.getSchedule(),
      vendor.getProfile().getVendorInfo()?.getRating(),
      vendor.getProfile().getVendorInfo()?.getIsAvailable()
    ));
  }

  async getAllDrivers(): Promise<DriverListItemService[]> {
    const drivers = await this.userRepository.getUsersByRole('driver');
    
    return drivers.map(driver => new DriverListItemService(
      driver.getId(),
      driver.getEmail(),
      driver.getProfile().getName(),
      driver.getProfile().getPhone(),
      driver.getCreatedAt(),
      driver.getProfile().getDriverInfo()?.getVehicle(),
      driver.getProfile().getDriverInfo()?.getIsAvailable(),
      driver.getProfile().getDriverInfo()?.getEarnings().getTotal()
    ));
  }

  async createCustomer(
    email: string, 
    password: string, 
    name: string, 
    phone: string
  ): Promise<CreateUserResponseService> {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }

    const hashedPassword = await this.hashPassword(password);

    const userData = {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'customer',
      profile: {
        name,
        phone,
        addresses: []
      },
      favorites: [],
      history: { orders: [], deliveries: [] },
      ratingsAndReviews: [],
      cart: []
    };

    const createdUser = await this.userRepository.createUser(userData);
    
    return new CreateUserResponseService(
      createdUser.getId(),
      createdUser.getEmail(),
      createdUser.getRole(),
      createdUser.getProfile().getName(),
      createdUser.getProfile().getPhone()
    );
  }
}