import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, HttpCode, HttpStatus, UseGuards, Inject } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { IUserService } from '../../domain/interfaces/IUserService';
import { USER_SERVICE } from '../../infrastructure/constants/user-service.constants';
import { CreateAddressRequest } from '../dtos/create-address-request';
import { GetAddressResponse } from '../dtos/get-address-response';
import { GetAddressesResponse } from '../dtos/get-addresses-response';
import { UpdateAddressRequest } from '../dtos/update-address-request';
import { CreateReviewRequest } from '../dtos/create-review-request';
import { GetReviewsResponse } from '../dtos/get-reviews-response';
import { AddCartItemRequest } from '../dtos/add-cart-item-request';
import { SetCartItemQuantityRequest } from '../dtos/set-cart-item-quantity-request';
import { GetCartResponse } from '../dtos/get-cart-response';
import { UpdateDriverAvailabilityRequest } from '../dtos/update-driver-availability-request';
import { GetDriverAvailabilityResponse } from '../dtos/get-driver-availability-response';
import { CreateVendorAdminDto } from '../dtos/create-vendor-admin.dto';
import { CreateDriverAdminDto } from '../dtos/create-driver-admin.dto';
import { CreateAdminDto } from '../dtos/create-admin.dto';
import { CreateUserResponse } from '../dtos/create-user-response.dto';
import { VendorListItem } from '../dtos/vendor-list-item.dto';
import { DriverListItem } from '../dtos/driver-list-item.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService
  ) {}

  @Get(':userId/addresses')
  async getAddresses(@Param('userId') userId: string): Promise<GetAddressesResponse> {
    const userAddressesData = await this.userService.getAddresses(userId);
    return GetAddressesResponse.fromServiceDto(userAddressesData);
  }

  @Get(':userId/addresses/:addressId')
  async getAddress(@Param('userId') userId: string, @Param('addressId') addressId: string): Promise<GetAddressResponse> {
    const address = await this.userService.getAddress(userId, addressId);

    return GetAddressResponse.fromServiceDto(address);
  }

  @Post(':userId/addresses')
  @HttpCode(HttpStatus.CREATED)
  async addAddress(@Param('userId') userId: string, @Body() body: CreateAddressRequest): Promise<void> {
    const requestService = body.toServiceDto();

    await this.userService.addAddress(userId, requestService);
  }

  @Put(':userId/addresses/:addressId')
  async updateAddress(@Param('userId') userId: string, @Param('addressId') addressId: string, @Body() body: UpdateAddressRequest): Promise<void> {
    const requestService = body.toServiceDto(addressId);

    await this.userService.updateAddress(userId, requestService);
  }

  @Delete(':userId/addresses/:addressId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAddress(@Param('userId') userId: string, @Param('addressId') addressId: string) {
    await this.userService.deleteAddress(userId, addressId);
  }

  @Post(':userId/reviews')
  @HttpCode(HttpStatus.CREATED)
  async addReview(
    @Param('userId') userId: string,
    @Body() body: CreateReviewRequest
  ): Promise<void> {
    const serviceDto = body.toServiceDto();
    await this.userService.addReview(userId, serviceDto);
  }

  @Get(':userId/reviews')
  async getReviews(
    @Param('userId') userId: string
  ): Promise<GetReviewsResponse> {
    const serviceResponse = await this.userService.getReviews(userId);
    return GetReviewsResponse.fromServiceDto(serviceResponse);
  }
  
  @Get(':userId/cart')
  async getCart(@Param('userId') userId: string): Promise<GetCartResponse> {
    const serviceDto = await this.userService.getCart(userId);
    return GetCartResponse.fromServiceDto(serviceDto);
  }
  
  @Post(':userId/cart/items')
  @HttpCode(HttpStatus.CREATED)
  async addCartItem(
    @Param('userId') userId: string,
    @Body() body: AddCartItemRequest
  ): Promise<void> {
    const serviceDto = body.toServiceDto();
    await this.userService.addCartItem(userId, serviceDto);
  }
  
  @Put(':userId/cart/items/:productId')
  async setCartItemQuantity(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() body: SetCartItemQuantityRequest
  ): Promise<void> {
    const serviceDto = body.toServiceDto(productId);
    await this.userService.setCartItemQuantity(userId, serviceDto);
  }

  @Get(':userId/driver/availability')
  async getDriverAvailability(
    @Param('userId') userId: string
  ): Promise<GetDriverAvailabilityResponse> {
    const isAvailable = await this.userService.getDriverAvailability(userId);
    return GetDriverAvailabilityResponse.fromServiceDto(isAvailable);
  }

  @Put(':userId/driver/availability')
  async updateDriverAvailability(
    @Param('userId') userId: string,
    @Body() body: UpdateDriverAvailabilityRequest
  ): Promise<void> {
    await this.userService.updateDriverAvailability(userId, body.isAvailable);
  }
  
  @Post('vendors')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  async createVendor(@Body() body: CreateVendorAdminDto): Promise<CreateUserResponse> {
    const serviceDto = await this.userService.createVendor(
      body.email,
      body.password,
      body.name,
      body.phone,
      body.restaurantName,
      body.description,
      body.schedule,
      body.category
    );
    return CreateUserResponse.fromServiceDto(serviceDto);
  }

  @Get('vendors')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getAllVendors(): Promise<VendorListItem[]> {
    const serviceDtos = await this.userService.getAllVendors();
    return serviceDtos.map(dto => VendorListItem.fromServiceDto(dto));
  }

  @Post('drivers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  async createDriver(@Body() body: CreateDriverAdminDto): Promise<CreateUserResponse> {
    const serviceDto = await this.userService.createDriver(
      body.email,
      body.password,
      body.name,
      body.phone,
      body.vehicle
    );
    return CreateUserResponse.fromServiceDto(serviceDto);
  }

  @Get('drivers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getAllDrivers(): Promise<DriverListItem[]> {
    const serviceDtos = await this.userService.getAllDrivers();
    return serviceDtos.map(dto => DriverListItem.fromServiceDto(dto));
  }

  @Post('admins')
  @HttpCode(HttpStatus.CREATED)
  async createAdmin(@Body() body: CreateAdminDto): Promise<CreateUserResponse> {
    const serviceDto = await this.userService.createAdmin(
      body.email,
      body.password,
      body.name,
      body.phone
    );
    return CreateUserResponse.fromServiceDto(serviceDto);
  }
}